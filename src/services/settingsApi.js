import { supabase } from "../lib/supabase";

export async function updateSettings(settings) {
  const { data, error } = await supabase.auth.updateUser({
    data: settings,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
