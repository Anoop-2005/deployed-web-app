import React, { useEffect, useState } from 'react'
import { FaCamera, FaLock, FaUber, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { BaseUrl, patch } from '../services/Endpoint';
import toast from 'react-hot-toast';
import { setUser } from '../redux/AuthSlice';

export default function Profile() {
  const {userId } =useParams();
  const dispatch =useDispatch()

  const [name, setName]=useState('');
  const [oldPassword, setOldPassword]=useState('');
  const [newPassword, setNewPassword]=useState('')
  const user=useSelector((state)=>state.auth.user)

  useEffect(()=>{
    if (user) {
      setName(user.name)
    }
  },[])

  const handleUpdateProfile=async(e)=>{
    e.preventDefault();
    console.log("submit clicked")
    const formData= new FormData();
    formData.append('name',name)
    formData.append('oldpassword',oldPassword)
    formData.append('newpassword', newPassword)
    
    try {
      const response = await patch(`auth/profile/${userId}`,formData)
      const data=response.data
      console.log(data)
      if (response.status==200) {
        toast.success(data.message)
        dispatch(setUser(data.user));
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.message){
        toast.error(error.response.data.message)
      }else {
        toast.error('Unexpected error')
      }
      
    }
  }
  return (
    <>
    <div className='profile-container'>
      <h1 className='profile-title'>Update Profile</h1>
      <form className='profile-form' onSubmit={handleUpdateProfile}>
        <div className='input-group'>
          <FaUser className='input-icon'/>
          <input
          type='text'
          placeholder='update Name'
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className='profile-input'
          />
        </div>

        <div className='input-group'>
          <FaLock className='input-icon'/>
          <input
          type='password'
          placeholder='Old password'
          value={oldPassword}
          onChange={(e)=> setOldPassword(e.target.value)}
          className='profile-input'
          />
        </div>

        <div className='input-group'>
          <FaLock className='input-icon'/>
          <input
          type='password'
          placeholder='New password'
          value={newPassword}
          onChange={(e)=>setNewPassword(e.target.value)}
          className='profile-input'
          />
        </div>
        <button type="submit" className='profile-button'>Update Profile</button>
      </form>

    </div>

    </>
  )
}
