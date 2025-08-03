import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();
  switch (req.method) {
    case "POST":
      return seedAdmin();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function seedAdmin() {
    /// check user ///
    // const checkUser: User = await prisma.user.findFirst({
    //     where: { role: 'ADMIN' },
    // })
    // if (!checkUser) {
    //     const password: string = bcrypt.hashSync(
    //         process.env.NEXT_DEMO_PASSWORD,
    //         10,
    //     )
    //     const insert: User = await prisma.user.create({
    //         data: {
    //             name: 'Alice',
    //             email: 'admin@admin.com',
    //             role: 'ADMIN',
    //             password: password,
    //         },
    //     })
    //     if (!insert) {
    //         return res.status(200).json({
    //             status: false,
    //             message: 'cannot create user amin',
    //         })
    //     }
    //     return res.status(200).json({
    //         status: true,
    //         data: insert,
    //     })
    // } else {
    //     return res.status(200).json({
    //         status: false,
    //         message: 'cannot create user amin',
    //     })
    // }
  }
}
