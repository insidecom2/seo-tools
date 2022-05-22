

import { NextApiRequest, NextApiResponse } from "next";
const jwt = require('jsonwebtoken');

const AuthAdmin = async (req: NextApiRequest, res: NextApiResponse)=>{
    const header = req.headers;
   
    if (!header.authorization) {
         res.status(401).send(401);
    }
    try {
        const token = header.authorization.replace("Bearer ", "");
        return await jwt.verify(token, process.env.NEXT_JWT_SECERT);
    } catch (error) {
        res.status(401).send(401);
    }
        res.status(401).send(401);
}

export default AuthAdmin;