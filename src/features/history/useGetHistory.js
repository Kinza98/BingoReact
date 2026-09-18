import { useQuery } from "@tanstack/react-query";
import { getGameHistory } from "../../services/historyApi";

export function useGameHistory(userId) {
  const {
    data: history,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["gameHistory", userId],
    queryFn: () => getGameHistory(userId),
    enabled: !!userId,
  });

  return { history, isLoading, error };
}
