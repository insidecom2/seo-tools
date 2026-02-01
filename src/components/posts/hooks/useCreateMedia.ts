import { useAlertStore } from "@/src/stores/alert";
import Http from "@/src/utils/http";
import {
  MutationFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

interface CreateMediaProps {
  source: string;
  sourceUrl: string;
}
const useCreateMedia = () => {
  const endpoint = process.env.NEXT_PUBLIC_API_OPT_SYNC_ENDPOINT;
  const url = `${endpoint}/v1/sync/media`;
  const queryClient = useQueryClient();
  const mutationFn: MutationFunction<CreateMediaProps> = async (
    data: CreateMediaProps,
  ) => {
    const response = await Http.post(url, data);
    return response.data;
  };

  const { setShow, setMessage, setVariant } = useAlertStore();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts-lists"],
      });
    },
    onError: (error) => {
      setMessage("Failed to update content: " + (error as Error).message);
      setVariant("danger");
      setShow(true);
    },
  });
};

export default useCreateMedia;
