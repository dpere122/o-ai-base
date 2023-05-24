import express, { response } from 'express'
import {Configuration, OpenAIApi} from 'openai'
import dotenv from 'dotenv'

//The goal of this middle man service is to ensure the data being sent is logged on our end
//Secondly we need to ensure that the openai bot is staying on topic
//Thirdly we need this to ensure that our keys are not saved on front-end systems

const app = express()
dotenv.config()
app.use(express.json());

var userConvos = [];

const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

/*
    Each user uses an instance of their own chat messages in each live session.
    Each user must be saved using a session ID of sorts
*/
async function iniChat(message:string){
    const results = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }]
    });
    return results.data.choices[0].message?.content;
};


app.get('/',(req,rest)=>{
    return rest.send("Welcome to the simple OpenAI Chat model!");
});

app.post('/api/prompt',async (req,res)=>{
    const chatInput = JSON.stringify(req.body.message);
    const results = await iniChat(chatInput);
    return res.send(results);
});

app.listen(3000,()=>{
    console.log("Application Listening at http://localhost:3000");
});





























