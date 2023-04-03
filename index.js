import axios from 'axios';
import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import Logger from './logger.js';

const app = express();
app.use(bodyParser.json({ limit: '2mb' }));
const port = process.env.PORT || 3000;



function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

app.use(express.urlencoded({
    extended: true
}))
  

app.post("/arbitrage", async function(req, res){
    let money = req.query.money;
    let provider = req.query.provider 
    let total_percentage = getRandomArbitrary(1,100);
    let total_profit = parseFloat(money) * (total_percentage/100);
    console.log(`arbitrage call with money: ${money}, provider: ${[provider]}`)
    res.send({
        "total_profit": total_profit,
        "total_percentage": total_percentage,
        "time_spending": getRandomArbitrary(5,20),
        "list_token": [
            {
                token_name: "A",
                value: getRandomArbitrary(100,2000),
            },
            {
                token_name: "B",
                value: getRandomArbitrary(100,2000),
            },
            {
                token_name: "C",
                value: getRandomArbitrary(100,2000),
            },

        ],
    }).status(200);
})

// app.get("/info", function (req, res){
//     Logger.info(`/info is called`);
//     axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=thb", {timeout: 3000}).then((response) => {
//         var data = response.data;
//         fs.writeFileSync("data.json", JSON.stringify(data));
//         Logger.info(`/info API called success`);
//         res.send(data);
        
//     }).catch((err)=> {
//         Logger.err(err);
//         var data = fs.readFileSync("data/data.json");
//         res.send(JSON.parse(data)).status(200);
//     })
    
// })

// app.get("/graph/:id/:day", function(req, res){
//     var id = req.params.id
//     var day = req.params.day
//     Logger.info(`/graph/${id}/${day} is called`);
//     var range = "";
//     if (day == 1){
//         range = "today";
//     }
//     else if (day == 7){
//         range = "week";
//     }
//     else if (day == 30){
//         range = "month";
//     }
//     else if (day == 365){
//         range = "year"
//     }
//     axios.get(`https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=thb&days=${day}`).then((response) => {
//         var data = response.data
//         fs.writeFileSync(`data/graph/${range}/${id}.json`,JSON.stringify(data));
//         Logger.info(`/graph/${id}/${day} API called success`);
//         res.send(data).status(200);
//     }).catch((err) => {
//         Logger.err(err);
//         var data = fs.readFileSync(`data/graph/${range}/${id}.json`);
//         res.send(JSON.parse(data)).status(200);

//     })
// })

app.get("/health", function(req, res){
    res.send("ok").status(200);
})

app.get("/", function(req, res){
    res.send("Hello").status(200);
})

app.listen(3000,function(req,res){
    console.log(`started listening at server ${port}`);
})