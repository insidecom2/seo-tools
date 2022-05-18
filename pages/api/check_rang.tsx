import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            return checkRang();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

function checkRang() {
    const { keyword , url} =  req.body;
}