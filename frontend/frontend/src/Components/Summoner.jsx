import React, { useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import platinum from '../ranks/Rank=Platinum.png'
import gold from '../ranks/Rank=Gold.png'
import iron from '../ranks/Rank=Iron.png'
import bronze from '../ranks/Rank=Bronze.png'
import silver from '../ranks/Rank=Silver.png'
import emerald from '../ranks/Rank=Emerald.png'
import diamond from '../ranks/Rank=Diamond.png'
import master from '../ranks/Rank=Master.png'
import grandmaster from '../ranks/Rank=Grandmaster.png'
import challenger from '../ranks/Rank=Challenger.png'
import unranked from '../ranks/unrank.png'
import champion from '../champion.json'










const Summoner = ({API_KEY}) => {

    
  

    const constant = 2;
    

    const location = useLocation();

    let i = 0;

    const summonerData = location.state;

    const img_id = summonerData.profileIconId;
    const puuid = summonerData.puuid;
    const summoner_id = summonerData.id;

    const [mastery,setMastery] = useState([]);

    

    const [champion1,setChampion] = useState("");
    const [champion2,setChampion2] = useState("");
    const [champion3,setChampion3] = useState("");

    const [team1,setteam1] = useState([])
    const [team2,setteam2] = useState([])

    const [rank,setRank] = useState("");
    const [rank2,setRank2] = useState("");

    const [matchlist,setList] = useState([])

    const [rankimg,setRankimg] = useState("")
    const [rankimg2,setRankimg2] = useState("")

    const [user,setUser] = useState("");
    const [meta,setMeta] = useState("");

    const [champStats,setStats] = useState([])


    const [unrank,setUnrank] = useState(false)
    const [unrank2,setUnrank2] = useState(false)

    const img = `https://ddragon.leagueoflegends.com/cdn/14.3.1/img/profileicon/${img_id}.png`

    

 

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
 
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }


    window.addEventListener('resize', handleResize);

  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  
   

    

    useEffect(() => {
        const top3 = async () => {
          try {
            const response = await fetch(`https://tr1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?api_key=${API_KEY}`, {
              method: 'GET'
            });
      
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
      
            const body = await response.json();
           
      
            setMastery(body);

            if (body && body.length > 0) {
                const keyToFind = body[0].championId.toString();
                const x =body[1].championId.toString();
                const y =body[2].championId.toString(); 
             
              
                const championsArray = Object.values(champion.data); //
           

                for(let i = 0;i<167;i++){
                    if(keyToFind === championsArray[i].key){
                        setChampion(championsArray[i].name)
                    }
                }

                for(let i = 0;i<167;i++){
                    if(x === championsArray[i].key){
                        setChampion2(championsArray[i].name)
                    }
                }

                for(let i = 0;i<167;i++){
                    if(y === championsArray[i].key){
                        setChampion3(championsArray[i].name)
                    }
                }


              
                
              }
            
          } catch (err) {
            console.error(err);
          }
        };
      
        top3();
      }, [constant, setChampion]); 
      
     

    useEffect(()=>{
        const ranking = async ()=>{

            try {
                const response = await fetch(`https://tr1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner_id}?api_key=${API_KEY}`, {
                    method: 'GET'
                });
        
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
        
                const body = await response.json();
         

                if(body && body.length > 0 && body[0].tier){

                    setRank(body[0]);

                const tier = await body[0].tier;

                switch(tier){
                    case 'IRON':
                        setRankimg(iron)
                        break;
                    case 'BRONZE':
                         setRankimg(bronze)
                        break;
                    case 'SILVER':
                        setRankimg(silver)
                         break;
                    case 'GOLD':
                        setRankimg(gold)
                        break;
                    case 'PLATINUM':
                        setRankimg(platinum)
                        break;
                    case 'EMERALD':
                        setRankimg(emerald)
                         break;
                    case 'DIAMOND':
                         setRankimg(diamond)
                         break;
                    case 'MASTER':
                        setRankimg(master)
                        break;
                     case 'GRANDMASTER':
                        setRankimg(grandmaster)
                        break;
                    case 'CHALLENGER':
                        setRankimg(challenger)
                        break;
                    
                    default:
                        setUnrank(true);
                        setRankimg(unranked);
                      
                }

                }
                else{
                    setUnrank(true);
                    setRankimg(unranked);
                }

                if(body && body.length > 1 && body[1].tier){

                    setRank2(body[1]);

                const tier2 = await body[1].tier;

                switch(tier2){
                    case 'IRON':
                        setRankimg2(iron)
                        break;
                    case 'BRONZE':
                         setRankimg2(bronze)
                        break;
                    case 'SILVER':
                        setRankimg2(silver)
                         break;
                    case 'GOLD':
                        setRankimg2(gold)
                        break;
                    case 'PLATINUM':
                        setRankimg2(platinum)
                        break;
                    case 'EMERALD':
                        setRankimg2(emerald)
                         break;
                    case 'DIAMOND':
                         setRankimg2(diamond)
                         break;
                    case 'MASTER':
                        setRankimg2(master)
                        break;
                     case 'GRANDMASTER':
                        setRankimg2(grandmaster)
                        break;
                    case 'CHALLENGER':
                        setRankimg2(challenger)
                        break;
                    
                    default:
                        setUnrank2(true);
                        setRankimg2(unranked);
                      
                }
                
                
               
        
        }
        else{
            setUnrank2(true);
            setRankimg2(unranked);
        }

       

      
    } catch(err){
        console.log(err);
    }
}
    


        ranking();
    },[]);

    useEffect(()=>{
        const senddata = async ()=>{

            try {

             
                const response = await fetch(`http://localhost:3030/matchIds`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                      },
                    body: JSON.stringify(summonerData),
                });

                const body = await response.json();
           
        
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
             
    
    
            } catch (err) {
                console.error(err);
            }

          

        }
        senddata();
    },[])

    useEffect(() => {
        const getmatches = async () => {
    
            try {
                const response = await fetch(`http://localhost:3030/matchId`, {
                    method: 'GET',
                });
                console.log("istek yollandı");
    
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
                const body = await response.json();
                console.log("cevapgeldi");
               
    
                const updatedMatchlist = [...matchlist, body];
        
    
                const updatedUser = [];
                const updatedMeta = [];

                
                const team101 = []

               
                const team201 = []
    
                for (let j = 0; j < 20; j++) {

                    const team100 = []
                    const team200 = []

                    const stats = [];

                    const mac1 = updatedMatchlist[0][j];
                    const mac1info = mac1.info
                    updatedMeta.push(mac1info)
                    
                    const mac1kisiler = mac1info.participants;
    
                    for (let i = 0; i < 10; i++) {
                        if (mac1kisiler[i].summonerId === summoner_id) {
                  
                            updatedUser.push(updatedMatchlist[0][j].info.participants[i]);
                            
                        }

                        if (mac1kisiler[i].teamId === 100) {
             
                            team100.push(updatedMatchlist[0][j].info.participants[i]);
                          
                            
                        }
                        if (mac1kisiler[i].teamId === 200) {
          
                            team200.push(updatedMatchlist[0][j].info.participants[i]);
                           

                            
                        }

                    }
                    team101.push(team100)
                    team201.push(team200)
                   
                }

                const championStats = {};
/////////////////
for (let i = 0; i < updatedUser.length; i++) {
  const user = updatedUser[i];


  if (user.championName !== "") {

    if (!championStats[user.championName]) {
      championStats[user.championName] = {
        name: "",
        kills: 0,
        deaths: 0,
        assists:0,
        matchesPlayed: 0,
        wins: 0,
        losses:0,
        cs : 0
      };
    }

   
    championStats[user.championName].name = user.championName;
    championStats[user.championName].matchesPlayed++;
    championStats[user.championName].deaths += user.deaths;
    championStats[user.championName].assists += user.assists;
    championStats[user.championName].kills += user.kills;
    championStats[user.championName].cs += user.totalMinionsKilled;


    if(user.win == true){
      championStats[user.championName].wins++;;

    }
    if(user.win == false){
      championStats[user.championName].losses++;;

    }
    
 
  }
}





const statsArray = Object.values(championStats)

const sortedChampStats = statsArray.slice().sort((a, b) => b.matchesPlayed - a.matchesPlayed);


setStats(sortedChampStats);



                
                
                setUser(updatedUser);
                setMeta(updatedMeta);

                setteam1(team101)
                setteam2(team201)
                
            } catch (err) {
                console.error(err);
            }
        };
    
        getmatches();
    }, [constant]);
    
   

    useEffect(()=>{
        const matchinfo= async ()=>{

            try {
                const response = await fetch(`http://localhost:3030/matchIds`, {
                    method: 'GET',
                   
                });

                const body = await response.json();
           
        
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
             
    
    
            } catch (err) {
                console.error(err);
            }

    

        } 
                

          

        
        matchinfo();
    },[])



  
    

    
    if(windowWidth >=1150){
    return (
        <div className="profile">
            <div className="general">
                <h1 style={{color:"whitesmoke"}}>{summonerData.name.toUpperCase()}</h1>
                <div className="icon">
                    <img src={img} alt="" style={{ width: "150px", height: "150px", borderRadius: "150px", border: "2px solid whitesmoke",marginTop:"25px" }} />
                    <div className="level">{summonerData.summonerLevel}</div>
                </div>
            </div>
            <div className="ranks">

            <div className="rank">
                    <div className="title" style={{fontWeight:"600"}}>MAIN CHAMPIONS</div>
                    <div className="section">

                    {mastery && mastery.map((hero, index) => (
  <div className="topc" key={hero.puuid}>
    {index === 0 && (
      <>
        <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champion1}.png`} alt="" style={{ width: "50px", height: "50px" }} />
        <h2 className="namec">{champion1}</h2>
        <img src={`/clevels/${hero.championLevel}.png`} alt="" style={{ width: "50px", height: "50px" }} />
        <h2 className="pts">{hero.championPoints} pts</h2>
      </>
    )}

    {index === 1 && (
      <>
        <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champion2}.png`} alt="" style={{ width: "50px", height: "50px" }} />
        <h2 className="namec">{champion2}</h2>
        <img src={`/clevels/${hero.championLevel}.png`} alt="" style={{ width: "50px", height: "50px" }} />
        <h2 className="pts">{hero.championPoints} pts</h2>
      </>
    )}

    {index === 2 && (
      <>
        <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champion3}.png`} alt="" style={{ width: "50px", height: "50px" }} />
        <h2 className="namec">{champion3}</h2>
        <img src={`/clevels/${hero.championLevel}.png`} alt="" style={{ width: "50px", height: "50px" }} />
        <h2 className="pts">{hero.championPoints} pts</h2>
      </>
    )}
  </div>
))}
    

                    
                    

                    
                </div>
                          
            </div>

                {unrank ? (
                    <div className="rank">
                        <div className="title" style={{fontWeight:"600"}}>RANKED FLEX</div>
                        <img src={unranked} alt="" style={{ width: "140px", height: "140px"}} />
                        <h2 id="elo">UNRANKED</h2>
                    </div>
                ) : (
                    <>
                        <div className="rank">
                            <div className="title" style={{fontWeight:"600"}}>RANKED FLEX</div>
                            <img src={rankimg} alt="" style={{ width: "140px", height: "140px"}} />
                            <h2 id="elo">{rank.tier} {rank.rank}</h2>
                            <h2 id="lp">{rank.leaguePoints} LP</h2>
                            <h2 id="win">{rank.wins}W</h2>
                            <h2 id="loss">{rank.losses}L</h2>
                            <h2 id="wr">WIN RATE {(((rank.wins) / (rank.losses + rank.wins)) * 100).toFixed(2)}%</h2>
                        </div>
                    </>
                )}
                

                {unrank2 ? (
                    <div className="rank">
                        <div className="title" style={{fontWeight:"600"}}>RANKED SOLO/DUO</div>
                        <img src={unranked} alt="" style={{ width: "140px", height: "140px" }} />
                        <h2 id="elo">UNRANKED</h2>
                    </div>
                ) : (
                    <>
                        <div className="rank">
                            <div className="title" style={{fontWeight:"600"}}>RANKED SOLO/DUO</div>
                            <img src={rankimg2} alt="" style={{ width: "140px", height: "140px" }} />
                            <h2 id="elo">{rank2.tier} {rank2.rank}</h2>
                            <h2 id="lp">{rank2.leaguePoints} LP</h2>
                            <h2 id="win">{rank2.wins}W</h2>
                            <h2 id="loss">{rank2.losses}L</h2>
                            <h2 id="wr">WIN RATE {(((rank2.wins) / (rank2.losses + rank2.wins)) * 100).toFixed(2)}%</h2>
                        </div>
                    </>
                )}

            </div>
            <div className="sectionn">
                <div className="heros">
                  <div className="title2"  style={{textAlign:"center",color:"whitesmoke"}}>CHAMPION STATS</div>
                  {champStats && champStats.map((stats)=>(
                    <div className="champion" key={stats.name}>
                     <div className="wl"> <span style={{color:"rgb(34, 199, 138)"}}>{stats.wins}W</span> <span style={{color:"red"}}> {stats.losses}L</span></div>
                      <div className="imagest">
                      <h2  style={{fontSize:"18px",fontWeight:"600",color:"whitesmoke",textAlign:"center",paddingBottom:"5px"}}>{stats.name.toUpperCase()} </h2>
                      <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${stats.name}.png`} alt="" style={{marginTop:"5px",marginBottom:"15px"}} />
                      </div>
                      <div className="avg" style={{paddingLeft:"12px",paddingTop:"12px"}}>
                        <div style={{color:"whitesmoke",fontSize:"16px"}}>{(stats.kills/stats.matchesPlayed).toFixed(1)}/{(stats.deaths/stats.matchesPlayed).toFixed(1)}/{(stats.assists/stats.matchesPlayed).toFixed(1)} Avg. KDA </div>
                        <div style={{color:"whitesmoke",fontSize:"16px"}}>{(stats.cs/stats.matchesPlayed).toFixed(1)} Avg. CS </div>
                        <div style={{color:"whitesmoke",fontSize:"16px",paddingTop:"12px"}}> <span style={{color:"rgb(41, 120, 209)"}}>%{((stats.wins/stats.matchesPlayed)*100).toFixed(2)} WIN RATE</span> ({stats.matchesPlayed} Matches)</div>
                      </div>
                      
                    </div>

                  ))}
                  

                </div>
                <div className="matches">
                <div className="title2" style={{textAlign:"center",color:"whitesmoke"}}>MATCH HISTORY</div>
            {user && user.map((match, index) => (
  <div className="match" key={match.puuid}>
    {match.win ? <div className="status"style={{backgroundColor:"#22c78a"}}><span id="st" style={{color:"#22c78a"}}>WIN</span> </div> : <div className="status" style={{backgroundColor:"red"}}><span id="st" style={{color:"red"}}>LOSS</span> </div> }
    <h1>{match.matchTitle}</h1>
    <div className="image">
      <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${match.championName}.png`} alt="" />
      <img src={`/spells/${match.summoner1Id}.png`} alt=""  style={{ width: "40px", height: "40px" }} id="spell"/>
      <img src={`/spells/${match.summoner2Id}.png`} alt=""  style={{ width: "40px", height: "40px" }} id="spell2"/>
      <img src={`/perks/${match.perks.styles[0].selections[0].perk}.png`} alt=""  style={{ width: "40px", height: "40px" }} id="spell3"/>
      <img src={`/perks/${match.perks.styles[1].style}.png`} alt=""  style={{ width: "30px", height: "30px" }} id="spell4"/>
      <div className="clevel">{match.champLevel}</div>
      
    </div>
    <div className="kda">
        <span style={{width:"140px"}}>{match.kills} / {match.deaths} / {match.assists} KDA </span>
        <span id="cs" style={{width:"100px"}}>{match.totalMinionsKilled} CS </span>

        
    </div>
    <div className="itemlist">

    <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/${match.item0}.png`} className="itemimg" alt="" />
    <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/${match.item1}.png`} className="itemimg" alt="" />
    <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/${match.item2}.png`} className="itemimg" alt="" />
    <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/${match.item3}.png`} className="itemimg" alt="" />
    <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/${match.item4}.png`} className="itemimg" alt="" />
    <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/${match.item5}.png`} className="itemimg" alt="" />
    <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/${match.item6}.png`} className="itemimg" alt="" />
     
    
     
      
    </div>
    {meta && meta.length > 0 && (
      <div key={meta[index % meta.length].gameName} className="matchtitle">
        {meta[index % meta.length].queueId === 440 ? (
  <span id="tittle">
    RANKED FLEX (
    {(meta[index % meta.length].gameDuration / 60).toFixed(0)}m{" "}
    {meta[index % meta.length].gameDuration % 60}s)
  </span>
) : (
  ""
)}

{meta[index % meta.length].queueId === 420 ? (
  <span  id="tittle">
    RANKED SOLO/DUO (
    {(meta[index % meta.length].gameDuration / 60).toFixed(0)}m{" "}
    {meta[index % meta.length].gameDuration % 60}s)
  </span>
) : (
  ""
)}

{meta[index % meta.length].queueId === 400 ? (
  <span  id="tittle">
    UNRANKED (
    {(meta[index % meta.length].gameDuration / 60).toFixed(0)}m{" "}
    {meta[index % meta.length].gameDuration % 60}s)
  </span>
) : (
  ""
)}

{meta[index % meta.length].queueId === 450 ? (
  <span  id="tittle">
    ARAM (
    {(meta[index % meta.length].gameDuration / 60).toFixed(0)}m{" "}
    {meta[index % meta.length].gameDuration % 60}s)
  </span>
) : (
  ""
)}

{meta[index % meta.length].queueId === 1900 ? (
  <span  id="tittle">
    URF (
    {(meta[index % meta.length].gameDuration / 60).toFixed(0)}m{" "}
    {meta[index % meta.length].gameDuration % 60}s)
  </span>
) : (
  ""
)}
        
        </div>
      
      

    )}
    <div className="tab">
        <div className="team" id="team1">
            {team1 && team1.length > 0 && 
            <div className="participant" key={team1[index % team1.length][0].teamId}>

            <span style={{top:"4px",left:"4px"}}> <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${team1[index % team1.length][0].championName}.png`} alt="" />{team1[index % team1.length][0].riotIdGameName}</span>
            <span style={{top:"44px",left:"4px"}}> <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${team1[index % team1.length][1].championName}.png`} alt="" />{team1[index % team1.length][1].riotIdGameName}</span>
            <span style={{top:"84px",left:"4px"}}> <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${team1[index % team1.length][2].championName}.png`} alt="" />{team1[index % team1.length][2].riotIdGameName}</span>
            <span style={{top:"124px",left:"4px"}}> <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${team1[index % team1.length][3].championName}.png`} alt="" />{team1[index % team1.length][3].riotIdGameName}</span>
            <span style={{top:"164px",left:"4px"}}> <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${team1[index % team1.length][4].championName}.png`} alt="" />{team1[index % team1.length][4].riotIdGameName}</span>
           
                
            </div>
            }

        </div>
        <div className="team" id="team2">
            {team1 && team2.length > 0 && 
            <div className="participant" key={team2[index % team2.length][0].teamId}>

            <span style={{top:"4px",left:"4px"}}> <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${team2[index % team2.length][0].championName}.png`} alt="" />{team2[index % team2.length][0].riotIdGameName}</span>
            <span style={{top:"44px",left:"4px"}}> <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${team2[index % team2.length][1].championName}.png`} alt="" />{team2[index % team2.length][1].riotIdGameName}</span>
            <span style={{top:"84px",left:"4px"}}> <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${team2[index % team2.length][2].championName}.png`} alt="" />{team2[index % team2.length][2].riotIdGameName}</span>
            <span style={{top:"124px",left:"4px"}}> <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${team2[index % team2.length][3].championName}.png`} alt="" />{team2[index % team2.length][3].riotIdGameName}</span>
            <span style={{top:"164px",left:"4px"}}> <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${team2[index % team2.length][4].championName}.png`} alt="" />{team2[index % team2.length][4].riotIdGameName}</span>
           
                
            </div>
            }

        </div>
    </div>
    
  </div>
))}

</div>
            </div>
            </div>

    );}
    else{

        return (
            <div className="profile" style={{width:"100%"}}>
                <div className="general">
                    <h1 style={{color:"whitesmoke"}}>{summonerData.name.toUpperCase()}</h1>
                    <div className="icon">
                        <img src={img} alt="" style={{ width: "150px", height: "150px", borderRadius: "150px", border: "2px solid whitesmoke",marginTop:"25px" }} />
                        <div className="level">{summonerData.summonerLevel}</div>
                    </div>
                </div>
                <div className="ranks">
    
                <div className="rank">
                        <div className="title" style={{fontWeight:"600"}}>MAIN CHAMPIONS</div>
                        <div className="section">
    
                        {mastery && mastery.map((hero, index) => (
      <div className="topc" key={hero.puuid}>
        {index === 0 && (
          <>
            <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champion1}.png`} alt="" style={{ width: "50px", height: "50px" }} />
            <h2 className="namec">{champion1}</h2>
            <img src={`/clevels/${hero.championLevel}.png`} alt="" style={{ width: "50px", height: "50px" }} />
            <h2 className="pts">{hero.championPoints} pts</h2>
          </>
        )}
    
        {index === 1 && (
          <>
            <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champion2}.png`} alt="" style={{ width: "50px", height: "50px" }} />
            <h2 className="namec">{champion2}</h2>
            <img src={`/clevels/${hero.championLevel}.png`} alt="" style={{ width: "50px", height: "50px" }} />
            <h2 className="pts">{hero.championPoints} pts</h2>
          </>
        )}
    
        {index === 2 && (
          <>
            <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champion3}.png`} alt="" style={{ width: "50px", height: "50px" }} />
            <h2 className="namec">{champion3}</h2>
            <img src={`/clevels/${hero.championLevel}.png`} alt="" style={{ width: "50px", height: "50px" }} />
            <h2 className="pts">{hero.championPoints} pts</h2>
          </>
        )}
      </div>
    ))}
        
    
                        
                        
    
                        
                    </div>
                              
                </div>
    
                    {unrank ? (
                        <div className="rank">
                            <div className="title" style={{fontWeight:"600"}}>RANKED FLEX</div>
                            <img src={unranked} alt="" style={{ width: "140px", height: "140px"}} />
                            <h2 id="elo">UNRANKED</h2>
                        </div>
                    ) : (
                        <>
                            <div className="rank">
                                <div className="title" style={{fontWeight:"600"}}>RANKED FLEX</div>
                                <img src={rankimg} alt="" style={{ width: "140px", height: "140px"}} />
                                <h2 id="elo">{rank.tier} {rank.rank}</h2>
                                <h2 id="lp">{rank.leaguePoints} LP</h2>
                                <h2 id="win">{rank.wins}W</h2>
                                <h2 id="loss">{rank.losses}L</h2>
                                <h2 id="wr">WIN RATE {(((rank.wins) / (rank.losses + rank.wins)) * 100).toFixed(2)}%</h2>
                            </div>
                        </>
                    )}
                    
    
                    {unrank2 ? (
                        <div className="rank">
                            <div className="title" style={{fontWeight:"600"}}>RANKED SOLO/DUO</div>
                            <img src={unranked} alt="" style={{ width: "140px", height: "140px" }} />
                            <h2 id="elo">UNRANKED</h2>
                        </div>
                    ) : (
                        <>
                            <div className="rank">
                                <div className="title" style={{fontWeight:"600"}}>RANKED SOLO/DUO</div>
                                <img src={rankimg2} alt="" style={{ width: "140px", height: "140px" }} />
                                <h2 id="elo">{rank2.tier} {rank2.rank}</h2>
                                <h2 id="lp">{rank2.leaguePoints} LP</h2>
                                <h2 id="win">{rank2.wins}W</h2>
                                <h2 id="loss">{rank2.losses}L</h2>
                                <h2 id="wr">WIN RATE {(((rank2.wins) / (rank2.losses + rank2.wins)) * 100).toFixed(2)}%</h2>
                            </div>
                        </>
                    )}
    
                </div>
                <div className="sectionn">
                <div className="heros">
                <div className="title2" style={{textAlign:"center",color:"whitesmoke"}}>CHAMPION STATS</div>
                  {champStats && champStats.map((stats)=>(
                    <div className="champion" key={stats.name}>
                      <div className="imagest">
                      <h2  style={{fontSize:"18px",fontWeight:"600",color:"whitesmoke",textAlign:"center",paddingBottom:"5px"}}>{stats.name.toUpperCase()}</h2>
                      <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${stats.name}.png`} alt="" style={{marginTop:"5px",marginBottom:"15px"}} />
                      </div>
                      <div className="avg" style={{paddingLeft:"12px",paddingTop:"12px"}}>
                        <div style={{color:"whitesmoke",fontSize:"16px"}}>{(stats.kills/stats.matchesPlayed).toFixed(1)}/{(stats.deaths/stats.matchesPlayed).toFixed(1)}/{(stats.assists/stats.matchesPlayed).toFixed(1)} Avg. KDA </div>
                        <div style={{color:"whitesmoke",fontSize:"16px"}}>{(stats.cs/stats.matchesPlayed).toFixed(1)} Avg. CS </div>
                        <div style={{color:"whitesmoke",fontSize:"16px",paddingTop:"12px"}}> <span style={{color:"rgb(41, 120, 209)"}}>%{((stats.wins/stats.matchesPlayed)*100).toFixed(2)} WIN RATE</span> ({stats.matchesPlayed} Matches)</div>
                      </div>
                      
                    </div>

                  ))}
                  

                </div>
                    <div className="matches">
                    <div className="title2" style={{textAlign:"center",color:"whitesmoke"}}>MATCH HISTORY</div>
                {user && user.map((match, index) => (
      <div className="match" key={match.puuid} style={{width:"350px"}}>
        {match.win ? <div className="status"style={{backgroundColor:"#22c78a"}}><span id="st" style={{color:"#22c78a"}}>WIN</span> </div> : <div className="status" style={{backgroundColor:"red"}}><span id="st" style={{color:"red"}}>LOSS</span> </div> }
        <h1>{match.matchTitle}</h1>
        <div className="image">
          <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${match.championName}.png`} alt="" />
          <img src={`/spells/${match.summoner1Id}.png`} alt=""  style={{ width: "40px", height: "40px" }} id="spell"/>
          <img src={`/spells/${match.summoner2Id}.png`} alt=""  style={{ width: "40px", height: "40px" }} id="spell2"/>
          <img src={`/perks/${match.perks.styles[0].selections[0].perk}.png`} alt=""  style={{ width: "40px", height: "40px" }} id="spell3"/>
          <img src={`/perks/${match.perks.styles[1].style}.png`} alt=""  style={{ width: "30px", height: "30px" }} id="spell4"/>
          <div className="clevel">{match.champLevel}</div>
          
        </div>
        <div className="kda">
            <span style={{width:"140px"}}>{match.kills} / {match.deaths} / {match.assists} KDA </span>
            <span id="cs" style={{width:"100px"}}>{match.totalMinionsKilled} CS </span>
    
            
        </div>
        <div className="itemlist">

          <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/${match.item0}.png`} className="itemimg" alt="" />
          <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/${match.item1}.png`} className="itemimg" alt="" />
          <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/${match.item2}.png`} className="itemimg" alt="" />
          <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/${match.item3}.png`} className="itemimg" alt="" />
          <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/${match.item4}.png`} className="itemimg" alt="" />
          <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/${match.item5}.png`} className="itemimg" alt="" />
          <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/${match.item6}.png`} className="itemimg" alt="" />

          
          
          
        </div>
        {meta && meta.length > 0 && (
          <div key={meta[index % meta.length].gameName} className="matchtitle">
            {meta[index % meta.length].queueId === 440 ? (
      <span id="tittle">
        RANKED FLEX (
        {(meta[index % meta.length].gameDuration / 60).toFixed(0)}m{" "}
        {meta[index % meta.length].gameDuration % 60}s)
      </span>
    ) : (
      ""
    )}
    
    {meta[index % meta.length].queueId === 420 ? (
      <span  id="tittle">
        RANKED SOLO/DUO (
        {(meta[index % meta.length].gameDuration / 60).toFixed(0)}m{" "}
        {meta[index % meta.length].gameDuration % 60}s)
      </span>
    ) : (
      ""
    )}
    
    {meta[index % meta.length].queueId === 400 ? (
      <span  id="tittle">
        UNRANKED (
        {(meta[index % meta.length].gameDuration / 60).toFixed(0)}m{" "}
        {meta[index % meta.length].gameDuration % 60}s)
      </span>
    ) : (
      ""
    )}
    
    {meta[index % meta.length].queueId === 450 ? (
      <span  id="tittle">
        ARAM (
        {(meta[index % meta.length].gameDuration / 60).toFixed(0)}m{" "}
        {meta[index % meta.length].gameDuration % 60}s)
      </span>
    ) : (
      ""
    )}
    
    {meta[index % meta.length].queueId === 1900 ? (
      <span  id="tittle">
        URF (
        {(meta[index % meta.length].gameDuration / 60).toFixed(0)}m{" "}
        {meta[index % meta.length].gameDuration % 60}s)
      </span>
    ) : (
      ""
    )}
            
            </div>
          
          
    
        )}
        
        
      </div>
    ))}
    
    </div>
                </div>
                </div>
    
        );

    }
}

export default Summoner;