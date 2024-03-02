const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
require("dotenv").config();




const port = 3030;
let data = {};
let matches = [];
let matchinfo = [];

const API_KEY =  process.env.apiKey

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }));

app.use(express.json());
app.use(bodyParser.json());

app.listen(port,()=> console.log("server is running..."));

app.get("/", async (req,res)=>{

    res.json("sa");

})

app.post("/matchIds", async(req,res)=>{

    data = await req.body;
    

})





app.get("/matchIds", async(req,res)=>{



    const puuid = data.puuid;


    

    try {
        const response = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${API_KEY}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const body = await response.json();

        res.send(body);

        matches = body;

        
    

    } catch (err) {
        console.error(err);
    }

    

    

})




    app.get(`/matchId`, async(req,res)=>{


        
    
        try {

            for(let i = 0;i<20;i++){

                const response = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/${matches[i]}?api_key=${API_KEY}`, {
                    method: 'GET',
                });
        
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
                const body = await response.json();
    
                matchinfo.push(body);
    


            }

            res.send(matchinfo);

            matchinfo = [];
    
                
            
        } catch (err) {
            console.log(err);
            res.status(404).json(err)
        }
    
        
    
        
    
    })





