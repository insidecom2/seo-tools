import { NextApiRequest, NextApiResponse } from "next";
import { getByBitPrice } from "../../../../src/lib/query/price";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const { symbol } = req.query;
      if (!symbol || typeof symbol !== "string") {
        return res.status(400).json({ error: "Symbol is required" });
      }

      try {
        const dataResp = await getByBitPrice(symbol);
        return res.status(200).json(dataResp);
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
