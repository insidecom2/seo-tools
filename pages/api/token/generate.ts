import { httpStatus } from "@/src/enums/http";
import { responseData } from "@/src/interface/response";
import AuthAdmin from "@/src/lib/middlewares/AuthAdmin";
import { generateKey } from "@/src/services/token";

import { NextApiRequest, NextApiResponse } from "next/types";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseData>
) {
  try {
    const checkAUth: any = await AuthAdmin(req);
    if (!checkAUth) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized",
      });
    }
    switch (req.method) {
      case "GET":
        generateKey(res);
        break;
      default:
        return res
          .status(httpStatus.FORBIDDEN)
          .json({ message: "Not allow this method" });
    }
  } catch (error) {
    return res.status(httpStatus.ERROR).json({ message: error });
  }
}

export default handler;
