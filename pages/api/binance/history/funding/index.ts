import { addBNBFutureBalance } from "@/src/lib/query/balance";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const xToken = req.headers["x-token-key"].toString();
  const tokenKey = process.env.TOKEN_KEY;
  const checkAUth = atob(xToken) === tokenKey;

  if (!checkAUth) {
    return res.status(401).json({
      status: false,
    });
  }
  switch (req.method) {
    case "POST":
      await addBNBFutureBalance();
      break;
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
