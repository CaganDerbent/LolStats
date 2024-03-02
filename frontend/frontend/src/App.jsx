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

  const key = import.meta.env.VITE_API_KEY


  return (
    <>

    <BrowserRouter>
    <Navbar/>

      <Routes>
         <Route path='/summoner/:id' element={<Summoner API_KEY={key}/>}></Route>
         <Route path='/' element={<Main API_KEY={key}/>}></Route>
         <Route path='/champions' element={<Champions API_KEY={key}/>}></Route>

      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App
