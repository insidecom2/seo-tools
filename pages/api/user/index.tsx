import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import AuthAdmin from '../../../src/lib/middlewares/AuthAdmin';

const handler = async (req: NextApiRequest, res: NextApiResponse ) => {

    const checkAUth: any = await AuthAdmin(req);
    if (!checkAUth) {
            return res.status(401).json({
            status: false,
        });
    }
    if (req.method == 'GET') {

        return res.status(200).json({
            status: true,
            data: { name: checkAUth.name}
        })
    }
}

export default handler;