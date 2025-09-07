import { binanceConnection } from "./connect";

interface IBinance {
  symbol: string;
  month: number;
  year: number;
}
const getBinanceFuturePositionHistory = async ({
  symbol,
  month,
  year,
}: IBinance) => {
  const client: any = await binanceConnection();

  // First day of the month
  const now = new Date(year, month - 1, 1); // 2025-09-01 00:00:00
  const firstDayOfMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
  ).getTime();

  const lastDayOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  ).getTime();

  const histories: any[] = await client.futuresIncome({
    symbol: symbol, // optional; omit to fetch all symbols
    incomeType: "REALIZED_PNL", // optional; filter by type
    startTime: firstDayOfMonth,
    endTime: lastDayOfMonth,
    limit: 1000,
  });

  const mergedIncome: Record<number, number> = {};

  histories.forEach((entry) => {
    // Use timestamp as key (or symbol + time if you have multiple symbols)
    const key = entry.time;
    mergedIncome[key] = (mergedIncome[key] || 0) + parseFloat(entry.income);
  });

  const mergedArray = Object.entries(mergedIncome).map(([time, income]) => ({
    time: Number(time),
    totalIncome: income,
    symbol: symbol,
  }));

  const sortedIncome = mergedArray.sort((a, b) => b.time - a.time);
  const totalPnL = sortedIncome.reduce(
    (sum, entry) => sum + entry.totalIncome,
    0
  );
  const winRateRow = sortedIncome.reduce(
    (row, entry) => (entry.totalIncome > 0 ? row + 1 : row),
    0
  );

  const loseRateRow = sortedIncome.reduce(
    (row, entry) => (entry.totalIncome < 0 ? row + 1 : row),
    0
  );
  return {
    histories: sortedIncome,
    totalPnL,
    winRatePercentage: (winRateRow / sortedIncome.length) * 100,
    loseRatePercentage: (loseRateRow / sortedIncome.length) * 100,
  };
};

export { getBinanceFuturePositionHistory };
