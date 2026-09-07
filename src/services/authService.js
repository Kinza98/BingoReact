import { supabase } from "../lib/supabase";

export async function signUp({ email, name, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function signIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function joinGuest({ name }) {
  const { data, error } = await supabase.auth.signInAnonymously({
    options: {
      data: {
        name,
      },
    },
  });
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function forgotPassword(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function resetPassword(password) {
  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
}