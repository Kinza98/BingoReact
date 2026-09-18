import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSettings } from "../../services/settingsApi";

export function useUpdateSettings() {
  const { mutate: updateSettingsFun, isPending: isLoading } = useMutation({
    mutationFn: updateSettings,
    onError: (error) => {
      toast.error(error?.message);
    },
    onSuccess: () => {
      toast.success("Settings updated successfully!");
    },
  });

  return { updateSettingsFun, isLoading };
}
