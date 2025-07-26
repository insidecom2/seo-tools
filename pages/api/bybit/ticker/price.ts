import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

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
        const dataResp = await getPrice(symbol);
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

const getPrice = async (symbol: string) => {
  const BASE_URL =
    "https://api.bybit.com/v5/market/tickers?category=spot&symbol=";

  const url = `${BASE_URL}${symbol}`;

  try {
    const response = await axios.get(url);
    return response.data.result.list[0];
  } catch (error) {
    console.log("ERROR >>>>>>", error.message);
    return null;
  }
};
