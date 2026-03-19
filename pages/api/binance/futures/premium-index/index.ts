import { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { symbol } = req.query;

  let binanceApiUrl = `https://fapi.binance.com/fapi/v1/premiumIndex`;
  if (symbol) {
    binanceApiUrl = `${binanceApiUrl}?symbol=${symbol}`;
  }
  try {
    const response = await fetch(binanceApiUrl);
    if (!response.ok) {
      throw new Error(
        `Error fetching data from Binance API: ${response.statusText}`,
      );
    }
    const data = await response.json();
    if (symbol) {
      return res.status(200).json(data);
    }

    const dataSort = data
      .sort((a, b) => b.lastFundingRate - a.lastFundingRate)
      .slice(0, 20);
    return res.status(200).json(dataSort);
  } catch (error) {
    console.error("API Error:", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
}
