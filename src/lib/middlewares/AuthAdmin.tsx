

import { NextApiRequest, NextApiResponse } from "next";
const jwt = require('jsonwebtoken');

const AuthAdmin = async (req: NextApiRequest)=>{
    const header = req.headers;
   
    if (!header?.authorization) {
        return false;
    }
    try {
        const token = header.authorization.replace("Bearer ", "");
        return await jwt.verify(token, process.env.NEXT_JWT_SECERT);
    } catch (error) {
        return false;
    }
}

export default AuthAdmin;