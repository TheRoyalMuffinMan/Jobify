const { connectToDatabase } = require("../../lib/db");
import type { NextApiRequest, NextApiResponse } from 'next';
const { run, normalize } = require("../../lib/model");

type Data = {
    response: string;
    success?: boolean
}

async function analyze(req: NextApiRequest, res: NextApiResponse<Data>) {


}





export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const model = run();
    console.log(model);

    switch (req.method) {
        case 'POST':
            analyze(req, res); break;
        default:
            res.status(403).json({ response: "Invalid Request Method", success: false }) 
    }
}


export const config = {
    api:{
        externalResolver: true,
    }
}