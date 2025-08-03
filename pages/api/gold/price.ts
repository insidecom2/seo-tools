import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const mysql = require("mysql2/promise");
        const url = process.env.DATABASE_URL;
        const connection = await mysql.createConnection(url);

        const [goldPrice] = await connection.execute(
          "SELECT * from tb_price order by f_datetime desc limit 0,1"
        );

        await connection.end();
        return res.status(200).json(goldPrice[0]);
      } catch (error: any) {
        console.error("API Error:", error);
        return res
          .status(500)
          .json({ error: error.message || "Internal Server Error" });
      }

    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
