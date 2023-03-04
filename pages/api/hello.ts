import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    response: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(200).json({ response: 'Hello' });
}

export const config = {
    api:{
        externalResolver: true,
    }
}