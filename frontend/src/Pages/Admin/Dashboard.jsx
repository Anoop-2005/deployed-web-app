import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { get } from '../../services/Endpoint'

export default function Dashboard() {
  const [post,setPost]=useState([])
  const [users,setUsers]=useState([])
  const [comments,setComments]=useState([])

  useEffect(()=>{
    const GetData=async()=>{
      try {
        const request = await get('/dashboard')
        const response = request.data
        console.log(response)
        if (request.status===200) {
          setPost(response.posts)
          setUsers(response.Users)
          setComments(response.comments)
        }
      } catch (error) {
        console.log(error)
        
      }
    }
    GetData()
  },[])
  return (
    <>
     <div>
      <h2 className='mb-4 text-black'>Dashboard</h2>
      <div className='row'>
        <div className='col-md-4 col-lg-4 col-sm-4 col-12'>
          <div className='card bg-dark text-white mb-4'>
            <div className='card-body'>
              <h5 className='card-title'>Total Users</h5>
              <p className='card-text'>{users ? users.length : '0'}</p>
            </div>
          </div>
        </div>

        <div className='col-md-4 col-lg-4 col-sm-4 col-12'>
          <div className='card bg-dark text-white mb-4'>
            <div className='card-body'>
              <h5 className='card-title'>Total Posts</h5>
              <p className='card-text'>{post ? post.length : '0'}</p>
            </div>
          </div>
        </div>

        <div className='col-md-4 col-lg-4 col-sm-4 col-12'>
          <div className='card bg-dark text-white mb-4'>
            <div className='card-body'>
              <h5 className='card-title'>Total Comments</h5>
              <p className='card-text'>{comments ? comments.length : '0'}</p>
            </div>
          </div>
        </div>


      </div>
     </div>
    </>
  )
}
