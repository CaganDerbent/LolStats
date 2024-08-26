
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"


const Main = ({API_KEY})=>{

    const [name,setName] = useState("");
    const [rid,setId] = useState("");
    const [data,setData] = useState("");
    const [err,setErr] = useState(false)

    const navigate = useNavigate();

  
    const find = async (e) => {
        e.preventDefault();

        console.log(name)

    
        try {
            const response = await fetch(`http://localhost:3030/summoner`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: name, rid:rid })
            });
    
            if (!response.ok) {
                setErr(true)
                throw new Error(`Bad response !`);

            }
                const body = await response.json();
                console.log(body)
           
                const id = body.puuid;
    
                setData(body);

                if(id != undefined){
                    navigate(`/summoner/${id}`,{state:body}) 

                }
                else{
                    setErr(true)

                }



        } catch (err) {
            setErr(true)
        }
    };


    return(
        <>
        <div className="main" style={{backgroundImage: 'url("/8359896.jpg")'}}>
        <h1 style={{color:"whitesmoke",marginTop:"80px",zIndex:"2"}}>Search for a summoner</h1>
            <div className="xxx"style={{zIndex:"2"}}>
                <input type="text" placeholder="SummonerName" id='text' autoComplete="off"  onChange={(e) => setName(e.target.value)} value={name}/>
                <input type="text" placeholder="#" id='text2' autoComplete="off" style={{width:"124px",textTransform: "uppercase"}} onChange={(e) => setId(e.target.value)} value={rid}/>
                <button onClick={find} id="searchbutton" style={{backgroundColor:"rgb(45, 46, 63)",color:"whitesmoke",fontSize:"16px"}}>Find</button>
            </div>
          
        {err ? <h1 style={{color:"whitesmoke",marginTop:"80px",zIndex:"2"}}>Summoner name not found.</h1> :<h1></h1>}

        </div>


        

        
        
        </>
    )
}

export default Main;