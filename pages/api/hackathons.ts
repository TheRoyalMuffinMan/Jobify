// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { connectToDatabase } = require("../../lib/db");
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    response: string;
    success?: boolean
}

async function getHackathon(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
        const { db } = await connectToDatabase();
        const hackathons = await db
            .collection("Hackathons")
            .find({})
            .sort({ published: -1})
            .toArray();
        
        res.json({
            response: JSON.parse(JSON.stringify(hackathons)),
            success: true
        })
    } catch (e) {
        const error: any = e ?? "Error in getHackathon()";
        res.json({
            response: new Error(error).message,
            success: false,
        });
    }
}

async function addHackathon(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
        const { db } = await connectToDatabase();
        await db.collection("Hackathons").insertOne(JSON.parse(req.body));
        res.json({
            response: "Post added sucessfully",
            success: true
        })
    } catch (e) {
        const error: any = e ?? "Error in addHackathon()";
        res.json({
            response: new Error(error).message,
            success: false,
        });
    }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            getHackathon(req, res); break;
        case 'POST':
            addHackathon(req, res); break;
        default:
            res.status(403).json({ response: "Invalid Request Method", success: false }) 
    }
}


export const config = {
    api:{
        externalResolver: true,
    }
}