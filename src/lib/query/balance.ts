import { addBalance } from "@/src/processers/balance";
import dayjs from "dayjs";
import { binanceConnection } from "./connect";
import { getBalanceFromBNB } from "./history";

export const addBNBFutureBalance = async () => {
  const client: any = await binanceConnection();
  const symbol = "USDT";
  const balance = getBalanceFromBNB(client, symbol);
  const yearMonth = dayjs().format("YYYY-MM");
  return addBalance({ year_month: yearMonth, amount: Number(balance) });
};
