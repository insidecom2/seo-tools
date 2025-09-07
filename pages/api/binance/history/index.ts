import { Split } from "./../../../../node_modules/type-fest/ts41/camel-case.d";
import { NextApiRequest, NextApiResponse } from "next";
import AuthAdmin from "@/src/lib/middlewares/AuthAdmin";
import { getBinanceFuturePositionHistory } from "@/src/lib/query/history";

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
      const { symbol, month_year } = req.query;
      if (!symbol || typeof symbol !== "string") {
        return res.status(400).json({ error: "Symbol is required" });
      }
      const dateNow = new Date();
      let month = dateNow.getMonth();
      let year = dateNow.getFullYear();

      if (month_year != "") {
        const getMonthYear = (month_year as string).split("-");
        month = parseInt(getMonthYear[1]);
        year = parseInt(getMonthYear[0]);
      }

      try {
        const data = await getBinanceFuturePositionHistory({
          symbol,
          month: month,
          year: year,
        });
        return res.status(200).json({ data });
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
