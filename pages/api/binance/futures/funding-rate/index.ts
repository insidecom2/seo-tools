import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { symbol, limit } = req.query;
  if (!symbol || typeof symbol !== "string") {
    return res.status(400).json({ error: "Invalid symbol parameter" });
  }

  const queryLimit = limit ? parseInt(limit as string, 10) : 100; // Default to 100 if limit is not provided
  const binanceApiUrl = `https://fapi.binance.com/fapi/v1/fundingRate?symbol=${symbol}&limit=${queryLimit}`;

  try {
    const response = await fetch(binanceApiUrl);
    if (!response.ok) {
      throw new Error(
        `Error fetching data from Binance API: ${response.statusText}`,
      );
    }
    const data = await response.json();
    const dataSort = data.sort(
      (a: any, b: any) => b.fundingTime - a.fundingTime,
    );
    return res.status(200).json(dataSort);
  } catch (error: any) {
    console.error("API Error:", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
}
