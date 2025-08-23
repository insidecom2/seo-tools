const bcrypt = require("bcrypt");
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
const jwt = require("jsonwebtoken");
import Joi from "joi";
import validate from "../../../src/lib/middlewares/validation";
import { getUserByEmail } from "../../../src/processers/auth";

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  rememberPassword: Joi.number(),
});

export default validate(
  { body: schema },
  (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
      case "POST":
        return authenticate();
      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    async function authenticate() {
      const { email, password } = req.body;
      const getUser = await getUserByEmail(email);

      if (getUser.id) {
        if (bcrypt.compareSync(password, getUser.password)) {
          const token = jwt.sign(
            {
              email: email,
              id: getUser.id,
              role: getUser.role,
            },
            process.env.NEXT_JWT_SECRET,
            { expiresIn: "1d" }
          );
          return res.status(200).json({
            status: true,
            message: "Success",
            token,
          });
        }
      }

      return res.status(401).json({
        status: false,
        message: "UnAuthentication",
      });
    }
  }
);
