import { supabase } from "../lib/supabase";

function generateGameCode(length = 6) {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  let code = "";

  for (let i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return code;
}

export async function createGame({ userId, playerName }) {
  const code = generateGameCode();

  const { data, error } = await supabase
    .from("games")
    .insert({
      code,
      host_id: userId,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  await addPlayerToGame({
    gameId: data.id,
    userId,
    playerName,
    turnOrder: 1,
  });

  return data;
}

export async function addPlayerToGame({
  gameId,
  userId,
  playerName,
  turnOrder,
}) {
  const { data, error } = await supabase
    .from("game_players")
    .insert({
      game_id: gameId,
      user_id: userId,
      player_name: playerName,
      turn_order: turnOrder,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getGame(gameId) {
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("id", gameId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getGamePlayers(gameId) {
  const { data, error } = await supabase
    .from("game_players")
    .select("*")
    .eq("game_id", gameId)
    .order("turn_order", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getGameByCode(code) {
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("code", code.toUpperCase())
    .single();

  if (error) {
    throw new Error("Game not found.");
  }

  return data;
}

export async function joinGame({ gameId, userId, playerName }) {
  const { data: players, error } = await supabase
    .from("game_players")
    .select("turn_order")
    .eq("game_id", gameId)
    .order("turn_order", { ascending: false })
    .limit(1);

  if (error) {
    throw new Error(error.message);
  }

  const nextTurnOrder = players.length > 0 ? players[0].turn_order + 1 : 1;

  return addPlayerToGame({
    gameId,
    userId,
    playerName,
    turnOrder: nextTurnOrder,
  });
}

export async function startGame(gameId) {
  const { data, error } = await supabase
    .from("games")
    .update({
      status: "playing",
    })
    .eq("id", gameId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// export async function removePlayer(gameId, userId) {
//   const { error } = await supabase
//     .from("game_players")
//     .delete()
//     .eq("game_id", gameId)
//     .eq("user_id", userId);

//   if (error) {
//     throw new Error(error.message);
//   }
// }

export async function removePlayer(gameId, userId) {
  const { data, error } = await supabase
    .from("game_players")
    .delete()
    .eq("game_id", gameId)
    .eq("user_id", userId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}