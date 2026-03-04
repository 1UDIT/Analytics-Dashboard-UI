import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadFile } from "@/features/Upload-Data/api/upload";

const queryClient = useQueryClient();

export const uploadMutation = useMutation({
  mutationFn: uploadFile,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["uploadedData"] });
  },
});