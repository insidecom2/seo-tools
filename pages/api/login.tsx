const bcrypt = require('bcrypt')
import { PrismaClient, User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
const jwt = require('jsonwebtoken');


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            return authenticate();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function authenticate() {
        const prisma = new PrismaClient()

        const { email, password } = req.body;

        if (email=== "undefined") {
            return res.status(200).json({
                status: false,
                message: 'wrong user'
            })
        }

        console.log('email:',email);
        const checkUser: User = await prisma.user.findFirst({
            where: { email: email , role:'ADMIN' },
        })

        console.log(checkUser);

        if (!checkUser) {
            return res.status(200).json({
                status: false,
                message: 'wrong user'
            })
        }

        if (bcrypt.compare(password, checkUser.password)) {
            const token = jwt.sign({ email: email, name:checkUser.name,id:checkUser.id,role:checkUser.role }, process.env.NEXT_JWT_SECERT, { expiresIn: '1d' });

            // return basic user details and token
            return res.status(200).json({
                status: true,
                token
            });
        } else {
            return res.status(200).json({
                status: false,
                message: 'wrong user'
            })
        }

    }

}