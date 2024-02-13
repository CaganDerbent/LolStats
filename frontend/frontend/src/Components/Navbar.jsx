import { Link } from "react-router-dom"
import { useState } from "react";

const Navbar = ()=>{

    return(
        <>

        <div className="navbar">
            <h1><Link to={'/'} className="link">LolStats</Link></h1>
            <ul>
                <li>
                    <Link to={'/champions'} className="link">Champions</Link>
                </li>
            </ul>


        </div>
        </>
    )
}

export default Navbar;