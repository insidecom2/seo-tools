import type { NextApiRequest, NextApiResponse } from "next";
import { getUserByRole, register } from "../../src/processers/auth";
import * as bcrypt from "bcrypt";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return seedAdmin();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function seedAdmin() {
    /// check user ///
    const userAdmin = await getUserByRole("ADMIN");
    if (userAdmin.length == 0) {
      const password: string = bcrypt.hashSync(
        process.env.NEXT_DEMO_PASSWORD,
        10
      );

      const email = process.env.NEXT_DEMO_USER;
      const userAdded = await register({ email, password, role: "ADMIN" });
      console.log(userAdded);
      if (userAdded) {
        return res.status(200).json({
          status: true,
          message: "Created user admin",
        });
      }
      return res.status(400).json({
        status: false,
        message: "Cannot create user admin",
      });
    }

    return res.status(400).json({
      status: false,
      message: "Already user admin",
      data: userAdmin,
    });
  }
}
