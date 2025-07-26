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
        const price = await getPriceBinance(symbol);
        return res.status(200).json({ symbol: symbol, price: price });
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

const getPriceBinance = async (symbol: string) => {
  const API_KEY = process.env.BINANCE_API_KEY;

  const BASE_URL = "https://api.binance.com";
  const endpoint = "/api/v3/ticker";

  const url = `${BASE_URL}${endpoint}/price?symbol=${symbol}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "X-MBX-APIKEY": API_KEY,
      },
    });

    return response.data.price;
  } catch (error) {
    console.log("ERROR >>>>>>", error.message);
    return null;
  }
};
