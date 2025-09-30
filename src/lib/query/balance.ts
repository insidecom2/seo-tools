import { addBalance } from "@/src/processers/balance";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { binanceConnection } from "./connect";
import { getBalanceFromBNB } from "./history";

// extend plugins
dayjs.extend(utc);
dayjs.extend(timezone);

export const addBNBFutureBalance = async () => {
  const client: any = await binanceConnection();
  const symbol = "USDT";
  const balance = await getBalanceFromBNB(client, symbol);
  const nowUTC7 = dayjs().tz("Asia/Bangkok");
  const yearMonth = nowUTC7.format("YYYY-MM");
  return addBalance({ year_month: yearMonth, amount: Number(balance) || 0 });
};
