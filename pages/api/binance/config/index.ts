import AuthAdmin from "@/src/lib/middlewares/AuthAdmin";
import { addConfig, getConfigList } from "@/src/processers/config";
import { randomUUID } from "crypto";
import { NextApiRequest, NextApiResponse } from "next/types";

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
      try {
        const resp = await getConfigList();
        return res.status(200).send({ data: resp });
      } catch (error) {
        return res.status(500).send({ error: error.message });
      }

    case "POST":
      const idGenerate = randomUUID();
      const { symbol, config } = req.body;
      if (!symbol || symbol === "") {
        return res.status(400).send(`Required symbol`);
      }
      if (!config || config === "") {
        return res.status(400).send(`Required config`);
      }

      try {
        const resp = await addConfig({ id: idGenerate, symbol, config });
        return res.status(201).send({ created: resp });
      } catch (error) {
        return res.status(500).send({ error: error.message });
      }

    default:
      return res.status(405).send(`Method ${req.method} Not Allowed`);
  }
}
