import React from 'react'
import RecentPost from '../Components/RecentPost'

export default function Home() {
  return (
    <>
    <div className='container-fluid bg-dark hero-section text-center'>
        <h1 className='fs-1 fw-bold text-light'>Welcome to Web Paraside</h1>
        <p className='text-light fs-5 mt-3'>
            Your go-to destination for full-stack engineering, practical AI/ML models, and seamless DevOps automation. 
            Master the core principles of computer science and learn to build smarter, faster, and more resilient systems.
        </p>
    </div>

    <div className='conatiner-fluid'>
        <RecentPost/>
    </div>


    
    </>
  )
}
