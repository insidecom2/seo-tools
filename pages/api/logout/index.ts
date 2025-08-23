
import type { NextApiRequest, NextApiResponse } from 'next'
import Cookies from 'js-cookie';
const handler = (req: NextApiRequest, res: NextApiResponse)=>
{
    let returnData: any = {}
    switch (req.method) {
        case 'POST':
            Cookies.remove('token')
            returnData = res.status(401).json({
                messaeg: 'Autorization 401'
            })
            break;
        default:
            returnData = res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    return returnData;
    
}

export default handler