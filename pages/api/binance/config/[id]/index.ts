import AuthAdmin from "@/src/lib/middlewares/AuthAdmin";
import { deleteConfig, getConfig, updateConfig } from "@/src/processers/config";
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

  const { symbol, config } = req.body;
  const id = req.query.id.toString();

  switch (req.method) {
    case "GET":
      try {
        const resp = await getConfig(id);
        return res.status(200).send({ data: resp });
      } catch (error) {
        return res.status(500).send({ error: error.message });
      }

    case "PUT":
      if (!id || id === "") {
        return res.status(400).send(`Required id`);
      }
      if (!symbol || symbol === "") {
        return res.status(400).send(`Required symbol`);
      }
      if (!config || config === "") {
        return res.status(400).send(`Required config`);
      }

      try {
        const resp = await updateConfig({ id: id, symbol, config });
        return res.status(200).send({ updated: resp });
      } catch (error) {
        return res.status(500).send({ error: error.message });
      }
    case "DELETE":
      if (!id || id === "") {
        return res.status(400).send(`Required id`);
      }

      try {
        const resp = await deleteConfig(id);
        return res.status(200).send({ deleted: resp });
      } catch (error) {
        return res.status(500).send({ error: error.message });
      }
    default:
      return res.status(405).send(`Method ${req.method} Not Allowed`);
  }
}
