import DBConnect from "../db/connect";

interface IBalance {
  year_month: string;
  amount?: number;
}

const tbl = "tbl_monthly_balance";
const getBalance = async ({ year_month }: IBalance): Promise<number> => {
  const sqlString = `SELECT * FROM ${tbl} WHERE \`year_month\`='${year_month}' `;
  const connection = await DBConnect();
  const [data] = await connection.execute(sqlString);
  await connection.end();
  if (data) return Number(data[0]?.amount);
  return 0;
};

export { getBalance };
