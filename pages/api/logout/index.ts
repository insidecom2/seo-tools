import type { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      res.setHeader(
        "Set-Cookie",
        "token=; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax",
      );
      return res.status(200).json({
        message: "Logged out",
      });
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
