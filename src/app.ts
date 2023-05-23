import express from 'express'
import https from 'https'

//The goal of this middle man service is to ensure the data being sent is logged on our end
//Secondly we need to ensure that the openai bot is staying on topic
//Thirdly we need this to ensure that our keys are not saved on front-end systems

const app = express()
app.use(express.json());

app.get('/',(req,rest)=>{
    return rest.send("Hello World");
});

app.post('/api/data',(req,res)=>{
    console.log(req.body);

    return res.sendStatus(200);
});

app.listen(3000,()=>{
    console.log("Application Listening at http://localhost:3000");
});





























