import DBConnect from "../db/connect";

const tbl = "tbl_setting";
const getSettings = async () => {
  try {
    const sqlString = `SELECT * FROM ${tbl} `;
    const connection = await DBConnect();
    const [data]: any = await connection.execute(sqlString);
    await connection.end();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateSettings = async (key: string, value: number | string) => {
  try {
    const sqlString = `UPDATE ${tbl} SET f_value='${value}' WHERE f_key='${key}'`;
    const connection = await DBConnect();
    const [data] = await connection.execute(sqlString);
    await connection.end();
    return !!data.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createSettings = async (key: string, value: number | string) => {
  try {
    const sqlString = `INSERT INTO ${tbl} (\`f_value\`, \`f_key\`) VALUES ('${value}','${key}') `;
    const connection = await DBConnect();
    const [data] = await connection.execute(sqlString);
    await connection.end();
    return !!data.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { createSettings, getSettings, updateSettings };
