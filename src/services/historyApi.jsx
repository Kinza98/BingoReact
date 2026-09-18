import { supabase } from "../lib/supabase";

export async function saveGameHistory({ userId, isWin, pattern, cardTheme }) {
  const { data, error } = await supabase
    .from("game_history")
    .insert({
      user_id: userId,
      is_win: isWin,
      pattern,
      card_theme: cardTheme,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getGameHistory(userId) {
  const { data, error } = await supabase
    .from("game_history")
    .select("is_win, pattern, card_theme, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteGameHistory(userId) {
  const { error } = await supabase
    .from("game_history")
    .delete()
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }
}
