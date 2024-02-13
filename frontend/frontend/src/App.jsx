import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Footer from './Components/Footer'
import Main from './Components/Main'
import Summoner from './Components/Summoner'
import { Link } from "react-router-dom"
import Navbar from './Components/Navbar'
import Champions from './Components/Champions'


function App() {


  return (
    <>

    <BrowserRouter>
    <Navbar/>

      <Routes>
         <Route path='/summoner/:id' element={<Summoner/>}></Route>
         <Route path='/' element={<Main/>}></Route>
         <Route path='/champions' element={<Champions/>}></Route>

      </Routes>
      <Footer/>
    </BrowserRouter>

  
    

   

    
    </>
  )
}

export default App
