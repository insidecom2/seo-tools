import AuthAdmin from "@/src/lib/middlewares/AuthAdmin";
import { deleteSettings } from "@/src/processers/setting";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const checkAUth: any = await AuthAdmin(req);
  if (!checkAUth) {
    return res.status(401).json({
      status: false,
    });
  }

  switch (req.method) {
    case "DELETE":
      try {
        const { key } = req.query;
        const resp = await deleteSettings(key.toString());
        return res.status(200).send({ deleted: resp });
      } catch (error) {
        return res.status(500).send({ error: error.message });
      }
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
