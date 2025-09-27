import { HTTP_STATUS_CODE } from "@/src/utils/constants";
import Http from "@/src/utils/http";
import { useState } from "react";

export const useUpdate = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //   const [lists, setLists] = useState(null);

  const updateData = async (props: { key: string; value: string }) => {
    try {
      setIsLoading(true);
      const body = props;
      const response = await Http.patch(`/api/binance/setting`, body);
      if (response.status === HTTP_STATUS_CODE.OK) {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return { updateData, isLoading };
};
