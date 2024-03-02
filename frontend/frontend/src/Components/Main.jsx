
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"


const Main = ({API_KEY})=>{

    const [name,setName] = useState("");
    const [data,setData] = useState("");
    const [err,setErr] = useState(false)

    const navigate = useNavigate();

  
    const find = async (e) => {
        e.preventDefault();

    
        try {
            const response = await fetch(`https://tr1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${API_KEY}`, {
                method: 'GET'
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const body = await response.json();
       
            const id = body.id;

            setData(body);

         

            navigate(`/summoner/${id}`,{state:body})

        } catch (err) {
            setErr(true)
        }
    };


    return(
        <>
        <div className="main">

            <div className="xxx">
                <input type="text" placeholder="SummonerName + (#TR1)" id='text' autoComplete="off"  onChange={(e) => setName(e.target.value)} value={name}/>
                <button onClick={find} id="searchbutton" style={{backgroundColor:"rgb(45, 46, 63)",color:"whitesmoke",fontSize:"16px"}}>Find</button>
            </div>
          
        {err ? <h1 style={{color:"whitesmoke",marginTop:"30px"}}>Summoner name not found.</h1> :<h1></h1>}

        </div>


        

        
        
        </>
    )
}

export default Main;