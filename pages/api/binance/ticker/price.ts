import { NextApiRequest, NextApiResponse } from "next/types";
import axios from "axios";
import { timeStamp } from "console";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const { symbol } = req.query;
      try {
        const data: any = await getPriceBinance(symbol as string); // BTCUSDT
        const nowISO = new Date().toISOString();
        return res.status(200).json({ price: data.price, timeStamp: nowISO });
      } catch (error) {
        return res.status(500).end(error);
      }
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const getPriceBinance = (symbol: string) => {
  return axios
    .get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
