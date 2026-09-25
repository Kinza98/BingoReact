import { supabase } from "../lib/supabase";

export async function saveCard(pattern) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to save a card.");
  }

  const { data, error } = await supabase
    .from("saved_cards")
    .insert({
      user_id: user.id,
      pattern,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getSavedCards() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to view saved cards.");
  }

  const { data, error } = await supabase
    .from("saved_cards")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteSavedCard(cardId) {
  const { error } = await supabase
    .from("saved_cards")
    .delete()
    .eq("id", cardId);

  if (error) {
    throw new Error(error.message);
  }
}

const defaultCards = [
  [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24,
  ],

  [
    4, 3, 2, 1, 0, 9, 8, 7, 6, 5, 14, 13, 12, 11, 10, 19, 18, 17, 16, 15, 24,
    23, 22, 21, 20,
  ],

  [
    0, 5, 10, 15, 20, 1, 6, 11, 16, 21, 2, 7, 12, 17, 22, 3, 8, 13, 18, 23, 4,
    9, 14, 19, 24,
  ],

  [
    20, 15, 10, 5, 0, 21, 16, 11, 6, 1, 22, 17, 12, 7, 2, 23, 18, 13, 8, 3, 24,
    19, 14, 9, 4,
  ],

  [
    0, 6, 12, 18, 24, 4, 8, 12, 16, 20, 2, 6, 12, 18, 22, 4, 8, 12, 16, 20, 0,
    6, 12, 18, 24,
  ],
];

export async function saveDefaultCards(userId) {
  const cards = defaultCards.map((numbers) => ({
    user_id: userId,
    numbers,
    is_default: true,
  }));

  const { data, error } = await supabase
    .from("saved_cards")
    .insert(cards)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
