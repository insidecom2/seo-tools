import { HTTP_STATUS_CODE } from "@/src/utils/constants";
import Http from "@/src/utils/http";
import { useState } from "react";

export const useLists = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lists, setLists] = useState(null);

  const getList = async () => {
    try {
      setIsLoading(true);
      const response = await Http.get(`/api/binance/setting`);
      if (response.status === HTTP_STATUS_CODE.OK) {
        setIsLoading(false);
        setLists(response.data.data);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return { getList, isLoading, lists };
};
