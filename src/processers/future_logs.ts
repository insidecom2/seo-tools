import DBConnect from "../db/connect";

const tbl = "future_log";

export interface GetFutureLogs {
  symbol: string;
  start?: number;
  limit?: number | null;
  type?: string;
}

const getFutureLogs = async ({
  symbol,
  start = 0,
  limit = 10,
  type = "",
}: GetFutureLogs) => {
  const connection = await DBConnect();
  let data: any;
  if (limit === null) {
    const sqlString = `SELECT * FROM ${tbl} WHERE symbol=? AND type_strategy=? ORDER BY timestamp DESC`;
    [data] = await connection.execute(sqlString, [symbol, type]);
  } else {
    const sqlString = `SELECT * FROM ${tbl} WHERE symbol=? AND type_strategy=? ORDER BY timestamp DESC LIMIT ?,?`;
    [data] = await connection.execute(sqlString, [symbol, type, start, limit]);
  }
  await connection.end();
  if (data) return data;
  return [];
};

const getCountFutureLogs = async ({ symbol, type }: GetFutureLogs) => {
  const sqlString = `SELECT count(f_id) as row FROM ${tbl} WHERE symbol=? AND type_strategy=?`;
  const connection = await DBConnect();
  const [data] = await connection.execute(sqlString, [symbol, type]);
  await connection.end();
  if (data) return data[0]["row"];
  return 0;
};

export { getCountFutureLogs, getFutureLogs };
