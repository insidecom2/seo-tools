import { symbol } from "joi";
import { NextApiRequest, NextApiResponse } from "next/types";
import { getByBitPrice, getFinnHub } from "@/src/lib/query/price";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const { symbols, withSymbol } = req.query;
      if (!symbols || typeof symbols !== "string" || symbols == "") {
        return res.status(400).json({ error: "Symbol is required" });
      }

      if (!withSymbol || typeof withSymbol !== "string" || withSymbol == "") {
        return res.status(400).json({ error: "withSymbol is required" });
      }

      const symbolArr = symbols.split(",");
      try {
        for (const symbol of symbols) {
        }
        const dataByBitResp = await callByBitWithSymbols(symbolArr, withSymbol);
        return res.status(200).json(dataByBitResp);
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

const callByBitWithSymbols = async (symbols: string[], withSymbol: string) => {
  const results = {
    byBit: [],
    finnHun: [],
  };
  for (const symbol of symbols) {
    try {
      const fullSymbol = symbol.toUpperCase() + withSymbol.toUpperCase();
      const responseByBit = await getByBitPrice(fullSymbol);
      const responseFinnHub = await getFinnHub(symbol);
      results.byBit.push(responseByBit);
      results.finnHun.push(responseFinnHub);
    } catch (error) {
      console.error("Error calling API:", error);
      return null;
    }
  }

  return results;
};
