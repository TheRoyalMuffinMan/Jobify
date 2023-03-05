const tf = require("@tensorflow/tfjs");
const tfnode = require("@tensorflow/tfjs-node");
const use = require("@tensorflow-models/universal-sentence-encoder");
const postings = require("./postings.json");
const { PorterStemmer } = require("natural");
const STOPWORDS = [
    'i','me','my','myself','we','our',
    'ours','ourselves','you','your',
    'yours','yourself','yourselves',
    'he','him','his','himself','she',
    'her','hers','herself','it','its',
    'itself','they','them','their','theirs',
    'themselves','what','which','who','whom',
    'this','that','these','those','am','is',
    'are','was','were','be','been','being',
    'have','has','had','having','do','does',
    'did','doing','a','an','the','and','but',
    'if','or','because','as','until','while',
    'of','at','by','for','with','about','against',
    'between','into','through','during','before',
    'after','above','below','to','from','up','down',
    'in','out','on','off','over','under','again',
    'further','then','once','here','there','when',
    'where','why','how','all','any','both','each',
    'few','more','most','other','some','such','no',
    'nor','not','only','own','same','so','than','too',
    'very','s','t','can','will','just','don','should','now'
];
const MODEL_NAME = "postings-model";

function remove_stopwords(sentence) {
    const res = []
    const words = sentence.split(' ');
    for(i = 0; i < words.length; i++) {
       const word_clean = words[i].split(".").join("");
       if (!STOPWORDS.includes(word_clean)) {
           res.push(word_clean);
       }
    }
    return res.join(' ');
}  

async function normalize(encoder, postings, key) {
    const sentences = new Array();
    for (const posting of postings) {
        let text = posting[key].toLowerCase();
        text = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
        text = text.replace(/\s{2,}/g, " ");
        text = remove_stopwords(text);
        text = PorterStemmer.stem(text);
        sentences.push(`<CLR>${text}<CLR>`);
    }

    return await encoder.embed(sentences);
}

async function run() {
    try {
        const loadedModel = await tfnode.loadLayersModel(MODEL_NAME);
        console.log("Using existing model");
        return loadedModel;
    } catch (e) {
        console.log("Training new model");
    }

    const encoder = await use.load();
    let title = await normalize(encoder, postings, "title");
    let location = await normalize(encoder, postings, "location");
    let department = await normalize(encoder, postings, "department");
    let salary_range = await normalize(encoder, postings, "salary_range");
    let company_profile = await normalize(encoder, postings, "company_profile");
    let description = await normalize(encoder, postings, "description");
    let requirements = await normalize(encoder, postings, "requirements");
    let benefits = await normalize(encoder, postings, "benefits");
    let telecommuting = await normalize(encoder, postings, "telecommuting");
    let has_questions = await normalize(encoder, postings, "has_questions");
    let employment_type = await normalize(encoder, postings, "employment_type");
    let required_experience = await normalize(encoder, postings, "required_experience");
    let required_education = await normalize(encoder, postings, "required_education");
    let func = await normalize(encoder, postings, "function");


    let xTrain = tfnode.concat([description, requirements], 1);
    xTrain = tfnode.concat([xTrain, title], 1);
    xTrain = tfnode.concat([xTrain, location], 1);
    xTrain = tfnode.concat([xTrain, department], 1);
    xTrain = tfnode.concat([xTrain, salary_range], 1);
    xTrain = tfnode.concat([xTrain, company_profile], 1);
    xTrain = tfnode.concat([xTrain, benefits], 1);
    xTrain = tfnode.concat([xTrain, telecommuting], 1);
    xTrain = tfnode.concat([xTrain, has_questions], 1);
    xTrain = tfnode.concat([xTrain, employment_type], 1);
    xTrain = tfnode.concat([xTrain, required_experience], 1);
    xTrain = tfnode.concat([xTrain, required_experience], 1);
    xTrain = tfnode.concat([xTrain, required_education], 1);
    xTrain = tfnode.concat([xTrain, func], 1);


    // 0 -> Real Job Posting, 1 -> Fake Job Posting
    const yTrain = tfnode.tensor2d(
        postings.map(p => [p.fraudulent === '0' ? 1 : 0, p.fraudulent === '1' ? 1 : 0])
    );

    const model = tfnode.sequential()
    
    model.add(
        tfnode.layers.dense({
            inputShape: [xTrain.shape[1]],
            activation: "softmax",
            units: 2
        })
    );

    model.compile({
        loss: "categoricalCrossentropy",
        optimizer: tfnode.train.adam(0.001),
        metrics: ["accuracy"]
    });

    await model.fit(xTrain, yTrain, {
        batchSize: 32,
        validationSplit: 0.1,
        shuffle: true,
        epochs: 150
    })

    await model.save(`file://./model/${MODEL_NAME}`);
}

run();