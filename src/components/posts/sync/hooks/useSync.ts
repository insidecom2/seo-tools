import { useAlertStore } from "@/src/stores/alert";
import { useModalStore } from "@/src/stores/modal";
import Http from "@/src/utils/http";
import {
  MutationFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

interface SyncPost {
  type: string;
}

export const useSync = (id: number) => {
  const { setShow, setMessage, setVariant } = useAlertStore();
  const { setClose } = useModalStore();
  const endpoint = process.env.NEXT_PUBLIC_API_OPT_SYNC_ENDPOINT;
  const queryClient = useQueryClient();
  const mutationFn: MutationFunction<SyncPost> = async (data: SyncPost) => {
    const path = getTypeSyncUrl(data.type);
    const url = `${endpoint}/v1/sync/${path}/${id}`;
    const response = await Http.post(url, data);
    return response.data;
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {
      setVariant("success");
      setMessage("Successfully sync post");
      setShow(true);
      setClose();
      queryClient.invalidateQueries({
        queryKey: ["posts-lists"],
      });
    },
    onError: (error) => {
      setVariant("danger");
      setMessage("Failed sync post: " + (error as Error).message);
      setShow(true);
      console.error("Error syncing post:", error);
    },
  });
};

const getTypeSyncUrl = (type: string) => {
  switch (type) {
    case "facebook":
      return "facebook";
    case "website":
      return "website/wp";
    case "google_business":
      return "google-business";
    default:
      return "";
  }
};
