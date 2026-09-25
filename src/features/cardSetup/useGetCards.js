import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getSavedCards } from "../../services/savedPatternApi";


export function useGetSavedCards() {
  const {
    data: savedCards,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["savedCards"],
    queryFn: getSavedCards,
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    savedCards,
    isLoading,
    error,
  };
}
