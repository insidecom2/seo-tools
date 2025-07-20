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
        const data = await getPriceBinance(symbol);
        const nowISO = new Date().toISOString();
        return res.status(200).json({ price: data.price, timeStamp: nowISO });
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
  try {
    const response = await axios.get(
      `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Binance Error:", error?.response?.data || error.message);
    throw new Error("Failed to fetch price from Binance");
  }
};
