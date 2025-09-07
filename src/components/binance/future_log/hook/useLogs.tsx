import { HTTP_STATUS_CODE } from "@/src/utils/constants";
import Http from "@/src/utils/http";
import { useState } from "react";
import { symbol } from "joi";

interface IBinanceLog {
  page: number;
  limit: number;
  symbol: string;
}
const useFutureLogs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lists, setLists] = useState(null);
  const [pagination, setPagination] = useState(null);
  const getLogs = async ({ symbol, page, limit }: IBinanceLog) => {
    try {
      setIsLoading(true);
      const response: any = await Http.get(
        `/api/binance/future_logs?symbol=${symbol}&page=${page}&limit=${limit}`
      );
      if (response.status === HTTP_STATUS_CODE.OK) {
        setIsLoading(false);
        setLists(response.data.data);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return { isLoading, getLogs, lists, pagination };
};
export default useFutureLogs;
