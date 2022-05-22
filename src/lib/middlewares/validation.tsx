
import { NextApiRequest, NextApiResponse } from "next";
import withJoi, { OnValidationError } from "next-joi";

export default withJoi({
  onValidationError: (req:NextApiRequest, res:NextApiResponse, error: OnValidationError) => {
    return res.status(200).json({ status: false, message: error.details[0].message })
  },
});



