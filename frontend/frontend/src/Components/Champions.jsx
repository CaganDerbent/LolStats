import { useEffect, useState } from "react";
import champion from '../champion.json'

const Champions = ()=>{


    const API_KEY = 'RGAPI-aef5a208-6ef6-42c0-a091-10959449b4c7'

    const [data,setData] = useState("");
    const [arr,setArr] = useState([])
    const [arr2,setArr2] = useState([])

    useEffect(()=>{

        async function findchampion (){
        
        
            try {
                const response = await fetch(`https://tr1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${API_KEY}`, {
                    method: 'GET'
                });
        
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
        
                const body = await response.json();
         

                const free = body.freeChampionIds;

                const newc = body.freeChampionIdsForNewPlayers;

    
                setData(body);


                
                const championsArray = Object.values(champion.data);
               
                const array = [];
                const array2 = [];
                

                for(let j = 0;j<free.length;j++){

                    const keyToFind = free[j].toString()

                    for(let i = 0;i<championsArray.length;i++){
                        if(keyToFind === championsArray[i].key){
                            array.push(championsArray[i].name);
                            
                        }
                    }

                }

                setArr(array);

                for(let j = 0;j<newc.length;j++){

                    const keyToFind = newc[j].toString()

                    for(let i = 0;i<championsArray.length;i++){
                        if(keyToFind === championsArray[i].key){
                            array2.push(championsArray[i].name);
                        
                        }
                    }

                }

                setArr(array);
                setArr2(array2);

                
                
    
    
            } catch (err) {
                console.error(err);
            }
        };
        findchampion()

    },[])



  
   
    return(
        <>
        <div className="profile">
           <div className="rotation">
            <h1>Free Champion Rotation</h1>
            <div className="line"></div>
            <div className="list">
            {arr && arr.map((champ)=>(
                <div className="champ" key={champ}>
                    <div className="info">
                    <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champ}.png`} alt="" style={{width:"80px", height:"80px"}} />
                    <span style={{color:"whitesmoke",marginTop:"4px"}}>{champ}</span>
                    </div>
                </div>

            ))}
            </div>
           
           </div>

           <div className="rotation">
            <h1>Free Champions For New Players</h1>
            <div className="line"></div>
            <div className="list">
            {arr2 && arr2.map((champ)=>(
                <div className="champ" key={champ}>
                    <div className="info">
                    <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champ}.png`} alt="" style={{width:"80px", height:"80px"}} />
                    <span style={{color:"whitesmoke",marginTop:"4px"}}>{champ}</span>
                    </div>
                </div>

            ))}
            </div>
           
           </div>

          
        </div>
        
        </>
    )
}

export default Champions;