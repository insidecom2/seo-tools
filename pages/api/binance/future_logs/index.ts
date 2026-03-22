import { Pagination } from "@/src/interface/pagination";
import AuthAdmin from "@/src/lib/middlewares/AuthAdmin";
import {
  getCountFutureLogs,
  getFutureLogs,
} from "@/src/processers/future_logs";
import { NextApiRequest, NextApiResponse } from "next/types";

interface IGetFutureLogs {
  symbol: string;
  timestamp: string;
  body_json: string;
  type_strategy: string;
}

interface FilterJson {
  key: string;
  value: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
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
        const type = req.query.type as string;
        const entry = req.query.entry as string;
        const filterJson: FilterJson[] = [];

        if (entry) {
          filterJson.push({
            key: "entry_type",
            value: entry,
          });
        }

        if (!symbol || typeof symbol !== "string") {
          return res.status(400).json({ error: "Symbol is required" });
        }

        const hasFilter = filterJson.length > 0;

        const data: IGetFutureLogs[] = await getFutureLogs({
          symbol: symbol,
          start: hasFilter ? 0 : start,
          limit: hasFilter ? null : limit,
          type: type || "",
        });

        const filtered = filterDataJson(data, filterJson);
        const pagedData = hasFilter
          ? filtered.slice(start, start + limit)
          : filtered;

        const total = hasFilter
          ? filtered.length
          : await getCountFutureLogs({ symbol: symbol, type: type || "" });

        const pagination: Pagination = {
          all: total,
          limit: limit,
          page: page,
          page_all: Math.ceil(total / limit),
        };

        return res.status(200).json({ data: pagedData, pagination });
      } catch (error: unknown) {
        return res.status(500).json({
          error:
            error instanceof Error ? error.message : "Internal Server Error",
        });
      }

    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const filterDataJson = (data: IGetFutureLogs[], filterJson: FilterJson[]) => {
  return data.filter((item) => {
    try {
      const json = JSON.parse(item.body_json);
      return filterJson.every((filter) => json[filter.key] === filter.value);
    } catch (error) {
      return false;
    }
  });
};
