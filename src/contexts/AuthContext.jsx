import { useContext, createContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = session?.user ?? null;

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
        name: user?.is_anonymous
          ? user?.user_metadata.name
          : user?.user_metadata?.name,
        guest: user?.is_anonymous,
        isAuthenticated: user?.role === "authenticated",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("Context cannot be used outside of the provider");
  return context;
}

export { useAuth, AuthProvider };
