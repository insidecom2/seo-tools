import type { NextApiRequest, NextApiResponse } from 'next'
import searchKeyword from '../../../src/lib/google/SearchTracking';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            return checkRang(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

async function checkRang(req: NextApiRequest, res: NextApiResponse) {
    const { keyword, url } = req.body;
    let limit: number = 10;
    let dataReturn: any = {};
    for (let page = 0; page < 10; page++) {
        dataReturn = {};
        dataReturn = await searchKeyword({ keyword: keyword, url: url, limit: (page * limit) });
        if (dataReturn?.position > 0) break;
    }
    res.status(200).json({ status: true, data: dataReturn })
}