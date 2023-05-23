import express from 'express'
import https from 'https'
import {Configuration, OpenAIApi} from 'openai'
import dotenv from 'dotenv'

//The goal of this middle man service is to ensure the data being sent is logged on our end
//Secondly we need to ensure that the openai bot is staying on topic
//Thirdly we need this to ensure that our keys are not saved on front-end systems

const app = express()
dotenv.config()
app.use(express.json());

const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

async function iniChat(message:string){
    await JSON.stringify(openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{role:'user',content:message}]
    }).then((response)=>{
        console.log(response.data.choices[0].message);
    }));
};


app.get('/',(req,rest)=>{
    return rest.send("Welcome to the simple OpenAI Chat model!");
});

app.post('/api/data',async (req,res)=>{
    const chatInput = JSON.stringify(req.body.message);
    console.log(chatInput);
    iniChat(chatInput)
    // const parsedRes = JSON.parse(await iniChat(chatInput));
    // console.log(parsedRes.data);
    return res.sendStatus(200);
});

app.listen(3000,()=>{
    console.log("Application Listening at http://localhost:3000");
});





























