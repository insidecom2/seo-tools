import DBConnect from "../db/connect";

const tbl = "future_log";

interface GetFutureLogs {
  symbol: string;
  start?: number;
  limit?: number;
  type?: string;
}

const getFutureLogs = async ({
  symbol,
  start = 0,
  limit = 10,
  type = "",
}: GetFutureLogs) => {
  const sqlString = `SELECT * FROM ${tbl} WHERE symbol="${symbol}" and type_strategy="${type}" 
                    ORDER BY timestamp DESC LIMIT ${start},${limit}`;
  const connection = await DBConnect();
  const [data] = await connection.execute(sqlString);
  await connection.end();
  if (data) return data;
  return [];
};

const getCountFutureLogs = async ({ symbol, type }: GetFutureLogs) => {
  const sqlString = `SELECT count(f_id) as row FROM ${tbl} WHERE symbol="${symbol}" and type_strategy="${type}"`;
  const connection = await DBConnect();
  const [data] = await connection.execute(sqlString);
  await connection.end();
  if (data) return data[0]["row"];
  return 0;
};

export { getCountFutureLogs, getFutureLogs };
