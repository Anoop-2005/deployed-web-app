import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import ChatbotWidget from "../components/Chatbot";

export default function UserLayout() {
  
  return (
    <>

            <Navbar/>

        <Outlet/>
          

    </>
  )
}
