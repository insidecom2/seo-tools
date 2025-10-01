import { HTTP_STATUS_CODE } from "@/src/utils/constants";
import Http from "@/src/utils/http";
import { useState } from "react";

export const useCreate = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createData = async (props: { key: string; value: string }) => {
    try {
      setIsLoading(true);
      const body = props;
      const response = await Http.post(`/api/binance/setting`, body);
      if (response.status === HTTP_STATUS_CODE.CREATED) {
        setIsLoading(false);
        return true;
      }
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  return { createData, isLoading };
};
