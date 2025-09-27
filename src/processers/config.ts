import DBConnect from "../db/connect";

interface IConfig {
  id: string;
  symbol: string;
  config: string;
}
const tbl = "tbl_bot_configs";
const addConfig = async (props: IConfig) => {
  const { id, symbol, config } = props;
  try {
    const sqlString = `INSERT INTO ${tbl} (\`id\`, \`symbol\`, \`config\`) 
                        VALUES ('${id}', '${symbol}', '${config}' ) `;
    const connection = await DBConnect();
    const [data] = await connection.execute(sqlString);
    await connection.end();
    return !!data.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateConfig = async (props: IConfig) => {
  const { id, symbol, config } = props;
  try {
    const sqlString = `UPDATE ${tbl} SET  \`symbol\`='${symbol}', \`config\`='${config}'
                            WHERE \`id\` = '${id}' `;
    const connection = await DBConnect();
    const [data] = await connection.execute(sqlString);
    await connection.end();
    return !!data.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteConfig = async (id: string) => {
  try {
    const sqlString = `DELETE FROM ${tbl} WHERE \`id\` = '${id}' `;
    const connection = await DBConnect();
    const [data] = await connection.execute(sqlString);
    await connection.end();
    return !!data.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getConfig = async (id: string) => {
  try {
    const sqlString = `SELECT * FROM ${tbl} WHERE \`id\` = '${id}' `;
    const connection = await DBConnect();
    const [data] = await connection.execute(sqlString);
    await connection.end();
    return data[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const getConfigList = async () => {
  try {
    const sqlString = `SELECT * FROM ${tbl} ORDER BY id desc`;
    const connection = await DBConnect();
    const [data] = await connection.execute(sqlString);
    await connection.end();
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { addConfig, deleteConfig, getConfig, getConfigList, updateConfig };
