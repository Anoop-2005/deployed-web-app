import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'


export default function UserLayout() {
  
  return (
    <>

            <Navbar/>

        <Outlet/>
        <Footer/>
          

    </>
  )
}
