import type { NextApiRequest, NextApiResponse } from 'next'
const jwt = require('jsonwebtoken');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return authenticate();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  function authenticate() {
    const { email, password } = req.body;
    if (email == process.env.NEXT_DEMO_USER && password == process.env.NEXT_DEMO_PASSWORD) {
      console.log('pass')
      const token = jwt.sign({ sub: email }, process.env.NEXT_JWT_SECERT, { expiresIn: '1d' });

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