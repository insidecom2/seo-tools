import { addBNBFutureBalance } from "@/src/lib/query/balance";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const xToken = req.headers["x-token-key"].toString();
  const tokenKey = process.env.TOKEN_KEY ?? "";
  const decoded = Buffer.from(xToken, "base64").toString("utf8");
  const checkAUth = decoded === tokenKey;

  if (!checkAUth) {
    return res.status(401).json({
      status: false,
    });
  }
  switch (req.method) {
    case "POST":
      const resp = await addBNBFutureBalance();
      return res.status(200).json({
        status: resp,
      });
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
