import DBConnect from "../db/connect";

interface IBalance {
  year_month: string;
  amount?: number;
}

const tbl = "tbl_monthly_balance";
const getBalance = async ({ year_month }: IBalance): Promise<number> => {
  try {
    const sqlString = `SELECT * FROM ${tbl} WHERE \`year_month\`='${year_month}' `;
    const connection = await DBConnect();
    const [data] = await connection.execute(sqlString);
    await connection.end();
    if (data) return Number(data[0]?.amount);
    return 0;
  } catch (error) {
    throw new Error(error.message);
  }
};

const addBalance = async ({
  year_month,
  amount,
}: IBalance): Promise<boolean> => {
  try {
    const sqlString = `INSERT INTO ${tbl} (\`year_month\`, \`amount\`) VALUES ('${year_month}', ${amount}) `;
    const connection = await DBConnect();
    const [data] = await connection.execute(sqlString);
    await connection.end();
    return !!data;
  } catch (error) {
    console.log("error", error.message);
    return false;
  }
};

export { addBalance, getBalance };
