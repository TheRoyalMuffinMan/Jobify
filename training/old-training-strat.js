// Requiring module
const tf = require("@tensorflow/tfjs")
const use = require("@tensorflow-models/universal-sentence-encoder")
const tfnode = require("@tensorflow/tfjs-node")
const trainData = require("./postings.json");

const MODEL_NAME = "postings-model";
const N_CLASSES = 1;

async function normalize(encoder, postings) {
    const text = postings.map((p) => p.text.toLowerCase());
    const embeddings = await encoder.embed(text);
    return embeddings;
}

async function train() {
    const encoder = await use.load();
    try {
        const loadedModel = await tfnode.loadLayersModel(MODEL_NAME);
        console.log("Using existing model");
        return loadedModel;
    } catch (e) {
        console.log("Training new model");
    }

    const xTrain = await normalize(encoder, trainData);
    console.log(xTrain);
    const yTrain = tfnode.tensor1d(
        trainData.map((p) => p.fraudulent === "Real" ? 1 : 0)
    );
    const model = tfnode.sequential();

    model.add(
        tfnode.layers.dense({
            inputShape: [xTrain.shape[1]],
            activation: "sigmoid",
            units: N_CLASSES
        })
    );

    model.compile({
        loss: "binaryCrossentropy",
        optimizer: tfnode.train.adam(0.001),
        metrics: ["accuracy"]
    });

    await model.fit(xTrain, yTrain, {
        batchSize: 32,
        validationSplit: 0.2,
        shuffle: true,
        epochs: 150
    })

    await model.save(`file://./models/${MODEL_NAME}`);

    return model;
}

train();