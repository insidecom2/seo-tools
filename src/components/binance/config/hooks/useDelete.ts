import { HTTP_STATUS_CODE } from "@/src/utils/constants";
import Http from "@/src/utils/http";
import { useState } from "react";

export const useDelete = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteData = async (props: { key: string }) => {
    try {
      setIsLoading(true);
      const { key } = props;
      const response = await Http.delete(`/api/binance/setting/${key}`);
      if (response.status === HTTP_STATUS_CODE.OK) {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return { deleteData, isLoading };
};
