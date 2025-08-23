import DBConnect from "../db/connect";

interface auth {
  email: string;
  password: string;
  role?: string;
}

const tb = "tbl_users";
const loginRepo = ({ email, password }: auth) => {
  const sqlString = `SELECT * FROM ${tb}`;
};

const getUserByEmail = async (email: string) => {
  try {
    const connection = await DBConnect();
    const [user] = await connection.execute(
      `SELECT * FROM ${tb} where email='${email}'`
    );
    await connection.end();
    if (user[0]) return user[0];
    return {};
  } catch (error) {
    return {};
  }
};

const getUserByRole = async (role: string) => {
  try {
    const connection = await DBConnect();
    const [user] = await connection.execute(
      `SELECT id, email, role FROM ${tb} where role='${role}'`
    );
    await connection.end();
    if (user) return user;
    return null;
  } catch (error) {
    return null;
  }
};

const register = async ({ email, password, role }: auth) => {
  try {
    const connection = await DBConnect();
    const [insert] = await connection.execute(
      `INSERT INTO ${tb} (email,password, role) VALUES ('${email}','${password}', '${role}')`
    );
    await connection.end();
    if (insert) return true;
    return false;
  } catch (error) {
    return false;
  }
};

export { loginRepo, register, getUserByEmail, getUserByRole };
