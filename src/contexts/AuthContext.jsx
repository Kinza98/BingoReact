import { useContext, createContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = session?.user ?? null;

  const darkMode = user?.user_metadata?.darkMode ?? false;
  const soundOn = user?.user_metadata?.soundOn ?? false;
  const saveHistory = user?.user_metadata?.saveHistory ?? false;

  useEffect(() => {
    async function getCurrentSession() {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error(error);
      }

      setSession(data.session);
      setLoading(false);
    }

    getCurrentSession();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        userId: user?.id,
        email: user?.email,
        name: user?.user_metadata?.name,
        isGuest: user?.is_anonymous,
        soundOn,
        darkMode,
        saveHistory,
        isAuthenticated: user?.role === "authenticated",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Context cannot be used outside of the provider");
  }

  return context;
}

export { useAuth, AuthProvider };
