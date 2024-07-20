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

app.post("/summoner",async (req,res)=>{

    const {name,rid} = req.body;

    console.log(name)
    console.log(rid)
    try {
        // https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/Cugan/TR1?api_key=RGAPI-499374a8-8962-4e81-a8a8-000186aaf9b2
        const response = await fetch(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${rid}?api_key=${API_KEY}`, {
            method: 'GET'
        });

        const body = await response.json();

        res.status(200).json(body)

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        

        
   
        

    } catch (err) {
        console.log(err)
   
    }
   
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

        matches = await body;

        
    

    } catch (err) {
        console.error(err);
    }

    

    

})




    // app.get(`/matchId`, async(req,res)=>{  
    //     try {
    //         for(let i = 0;i<20;i++){
    //             const response = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/${matches[i]}?api_key=RGAPI-499374a8-8962-4e81-a8a8-000186aaf9b2`, {
    //                 method: 'GET',
    //             }); 
    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! Status: ${response.status}`);
    //             }
    //             const body = await response.json();
    //             console.log(body)
    //             matchinfo.push(body);
    //         
    //         res.send(matchinfo);
    //         matchinfo = [];      
    //     } catch (err) {
    //         console.log(err);
    //         res.status(404).json(err)
    //     }
    // })

    app.get('/matchId', async (req, res) => {
        try {
          const API_KEY = 'RGAPI-499374a8-8962-4e81-a8a8-000186aaf9b2';
      
          for (let i = 0; i < 20; i++) {
            try {
              const response = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/${matches[i]}?api_key=${API_KEY}`, {
                method: 'GET',
              });
      
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
      
              const body = await response.json();
              console.log(body);
              matchinfo.push(body);
            } catch (error) {
              console.error(`Error fetching match ${matches[i]}: ${error.message}`);
            }
          }
      
          res.send(matchinfo);
        } catch (err) {
          console.log(err);
          res.status(500).json({ error: 'Internal Server Error' });
        } finally {
          matchinfo = [];
        }
      });





