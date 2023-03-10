import * as use from "@tensorflow-models/universal-sentence-encoder";
import * as tf from "@tensorflow/tfjs";
import * as natural from "natural";
import type { NextApiRequest, NextApiResponse } from 'next';
const { run, remove_stopwords } = require("../../lib/model");

type Data = {
    response: string;
    real: number;
    fake: number;
    success?: boolean
}

async function clean(encoder: use.UniversalSentenceEncoder, text: string) {
    text = text.toLowerCase();
    text = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    text = text.replace(/\s{2,}/g, " ");
    text = remove_stopwords(text);
    text = natural.PorterStemmer.stem(text);
    return await encoder.embed(`<CLR>${text}<CLR>`);
}

async function pipeline(xData: any) {
    const encoder: use.UniversalSentenceEncoder = await use.load();
    let title: tf.Tensor = await clean(encoder, xData.title);
    let location: tf.Tensor = await clean(encoder, xData.location);
    let department: tf.Tensor = await clean(encoder, xData.department);
    let salary_range: tf.Tensor = await clean(encoder, xData.salary_range);
    let company_profile: tf.Tensor = await clean(encoder, xData.company_profile);
    let description: tf.Tensor = await clean(encoder, xData.description);
    let requirements: tf.Tensor = await clean(encoder, xData.requirements);
    let benefits: tf.Tensor = await clean(encoder, xData.benefits);
    let telecommuting: tf.Tensor = await clean(encoder, xData.telecommuting);
    let has_questions: tf.Tensor = await clean(encoder, xData.has_questions);
    let employment_type: tf.Tensor = await clean(encoder, xData.employment_type);
    let required_experience: tf.Tensor = await clean(encoder, xData.required_experience);
    let required_education: tf.Tensor = await clean(encoder, xData.required_education);
    let func: tf.Tensor = await clean(encoder, xData.function);
    console.log("All Normailzed, proceed to concat tensors.");

    let xPredict: tf.Tensor = tf.concat([description, requirements], 1);
    xPredict = tf.concat([xPredict, title], 1);
    xPredict = tf.concat([xPredict, location], 1);
    xPredict = tf.concat([xPredict, department], 1);
    xPredict = tf.concat([xPredict, salary_range], 1);
    xPredict = tf.concat([xPredict, company_profile], 1);
    xPredict = tf.concat([xPredict, benefits], 1);
    xPredict = tf.concat([xPredict, telecommuting], 1);
    xPredict = tf.concat([xPredict, has_questions], 1);
    xPredict = tf.concat([xPredict, employment_type], 1);
    xPredict = tf.concat([xPredict, required_experience], 1);
    xPredict = tf.concat([xPredict, required_experience], 1);
    xPredict = tf.concat([xPredict, required_education], 1);
    xPredict = tf.concat([xPredict, func], 1);

    return xPredict;
}

async function analyzer(req: NextApiRequest, res: NextApiResponse<Data>) {
    const parsed = JSON.parse(req.body);
    if (!parsed || Object.keys(parsed).length === 0) {
        res.json({
            response: "Model Failed",
            real: 0,
            fake: 0,
            success: false
        });
        return;
    }
    console.log(parsed);
    const model = await run();
    console.log(model);
    const xPredict = await pipeline(parsed);
    console.log(xPredict);
    const results = await model.predict(xPredict).data();
    res.json({
        response: "Model completed",
        real: results[0],
        fake: results[1],
        success: true
    });
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method == "POST") {
        analyzer(req, res);
    } else {
        res.status(403).json({ response: "Invalid Request Method", real: 0, fake: 0, success: false }) 
    }
}


export const config = {
    api:{
        externalResolver: true,
    }
}