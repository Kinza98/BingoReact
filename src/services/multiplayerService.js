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

// export async function startGame(gameId) {
//   const { data, error } = await supabase
//     .from("games")
//     .update({
//       status: "playing",
//     })
//     .eq("id", gameId)
//     .select()
//     .single();

//   if (error) {
//     throw new Error(error.message);
//   }

//   return data;
// }

export async function startGame(gameId) {
  const { data: firstPlayer, error: playerError } = await supabase
    .from("game_players")
    .select("turn_order")
    .eq("game_id", gameId)
    .order("turn_order", { ascending: true })
    .limit(1)
    .single();

  if (playerError) throw new Error(playerError.message);

  const { data, error } = await supabase
    .from("games")
    .update({
      status: "playing",
      current_turn: firstPlayer.turn_order,
      called_numbers: [],
      winner_id: null,
    })
    .eq("id", gameId)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function removePlayer(gameId, userId) {
  const { error } = await supabase
    .from("game_players")
    .delete()
    .eq("game_id", gameId)
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }
}

// export async function removePlayer(gameId, userId) {
//   const { data, error } = await supabase
//     .from("game_players")
//     .delete()
//     .eq("game_id", gameId)
//     .eq("user_id", userId)
//     .select();

//   if (error) {
//     throw new Error(error.message);
//   }

//   return data;
// }

export async function endGame(gameId) {
  const { data, error } = await supabase
    .from("games")
    .update({
      status: "ended",
    })
    .eq("id", gameId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export function endGameOnClose({ gameId, accessToken }) {
  return fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/games?id=eq.${gameId}&status=eq.playing`,
    {
      method: "PATCH",
      keepalive: true,
      headers: {
        "Content-Type": "application/json",
        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${accessToken}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        status: "ended",
      }),
    },
  );
}

export async function playMultiplayerTurn({
  gameId,
  currentTurn,
  value,
  players,
}) {
  const calledNumbers = await getGame(gameId).then(
    (game) => game.called_numbers ?? [],
  );

  if (calledNumbers.includes(value)) {
    throw new Error("This number has already been called.");
  }

  const currentPlayerIndex = players.findIndex(
    (player) => player.turn_order === currentTurn,
  );

  if (currentPlayerIndex === -1) {
    throw new Error("Current player not found.");
  }

  const nextPlayer = players[(currentPlayerIndex + 1) % players.length];

  const { data, error } = await supabase
    .from("games")
    .update({
      called_numbers: [...calledNumbers, value],
      current_turn: nextPlayer.turn_order,
    })
    .eq("id", gameId)
    .eq("current_turn", currentTurn)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}
