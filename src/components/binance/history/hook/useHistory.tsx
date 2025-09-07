import { HTTP_STATUS_CODE } from "@/src/utils/constants";
import Http from "@/src/utils/http";
import { useState } from "react";

interface IBinanceHistory {
  symbol: string;
  monthYear: string;
}
const useHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lists, setLists] = useState(null);
  const getPositionHistory = async ({ symbol, monthYear }: IBinanceHistory) => {
    try {
      setIsLoading(true);
      const response: any = await Http.get(
        `/api/binance/history?symbol=${symbol}&month_year=${monthYear}`
      );
      if (response.status === HTTP_STATUS_CODE.OK) {
        setIsLoading(false);
        setLists(response.data.data);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return { isLoading, getPositionHistory, lists };
};
export default useHistory;
