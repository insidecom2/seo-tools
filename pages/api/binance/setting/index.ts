import AuthAdmin from "@/src/lib/middlewares/AuthAdmin";
import { getSettings, updateSettings } from "@/src/processers/setting";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, resp: NextApiResponse) => {
  const checkAUth: any = await AuthAdmin(req);
  if (!checkAUth) {
    return resp.status(401).json({
      status: false,
    });
  }

  switch (req.method) {
    case "GET":
      try {
        const res = await getSettings();
        return resp.status(200).send({ data: res });
      } catch (error) {
        return resp.status(500).end({ error: error.message });
      }
    case "PATCH":
      const { key, value } = req.body;
      if (!key || key == "") {
        return resp.status(400).send(`Required key`);
      }
      if (!value || value === "") {
        return resp.status(400).send(`Required value`);
      }

      try {
        const res = await updateSettings(key, Number(value));
        return resp.status(200).send({ updated: res });
      } catch (error) {
        return resp.status(500).send({ error: error.message });
      }
    default:
      return resp.status(405).send(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
