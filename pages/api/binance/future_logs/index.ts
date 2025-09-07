import { Pagination } from "@/src/interface/pagination";
import AuthAdmin from "@/src/lib/middlewares/AuthAdmin";
import {
  getCountFutureLogs,
  getFutureLogs,
} from "@/src/processers/future_logs";
import { number } from "joi";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const checkAUth: any = await AuthAdmin(req);
  if (!checkAUth) {
    return res.status(401).json({
      status: false,
    });
  }

  switch (req.method) {
    case "GET":
      try {
        const limit = parseInt(req.query.limit as string) ?? 10;
        const page =
          (parseInt(req.query.page as string) &&
            parseInt(req.query.page as string)) <= 0
            ? 1
            : parseInt(req.query.page as string);
        const symbol = req.query.symbol as string;
        const start = (page - 1) * limit;

        if (!symbol || typeof symbol !== "string") {
          return res.status(400).json({ error: "Symbol is required" });
        }

        const data = await getFutureLogs({
          symbol: symbol,
          start: start,
          limit: limit,
        });

        const row = await getCountFutureLogs({ symbol: symbol });
        const pagination: Pagination = {
          all: row,
          limit: limit,
          page: page,
          page_all: Math.ceil(row / limit),
        };

        return res.status(200).json({ data, pagination });
      } catch (error: any) {
        return res
          .status(500)
          .json({ error: error.message || "Internal Server Error" });
      }

    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
