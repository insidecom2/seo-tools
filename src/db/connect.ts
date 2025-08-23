const DBConnect = async () => {
  const mysql = require("mysql2/promise");
  const url = process.env.DATABASE_URL;
  const connection = await mysql.createConnection(url);

  return connection;
};

export default DBConnect;
