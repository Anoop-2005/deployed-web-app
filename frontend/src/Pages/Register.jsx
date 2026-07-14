import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import { post } from '../services/Endpoint';


export default function Register() {
  const navigate=useNavigate()
  const [value, setValue]=useState({
    name:'',
    email:'',
    password:'',
  });


  const handleSubmit=async(e)=>{
    e.preventDefault();

    const formData= new FormData();
    formData.append('name', value.name);
    formData.append('email', value.email);
    formData.append('password', value.password);

    try {
      const response=await post('auth/register', formData,{ 
        headers:{
          'content-Type':'multipart/form-data',
        },
      });

      const data = response.data;
      if (data.success){
        console.log(data.message)
        navigate('/login')
        toast.success(data.message)
      }
      console.log('register api', data)
    } catch (error) {
      console.log('login error', error)
      if (error.response && error.response.data && error.response.data.message){
        toast.error(error.response.data.message)
      } else {
        toast.error("Unexpected Error")
      }
      
    }
  }

  return (
    <>
    <section className='bg-light'>
      <div className='container d-flex flex-column align-items-center justify-content-center min-vh-100 py-4'>
        <Link to='/' className='mb-4 text-dark text-decoration-none d-flex align-items-center'>
          <img className='me-2' src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" width="32" height="32"/>
          <span className='h4 mb-0 fw-bold'>FullStack is Fun!</span></Link>
      
        <div className='card shadow-sm w-100' style={{ maxWidth: '400px'}}>
        <div className='card-body p-4'>
          <h1 className='h5 mb-4 fw-bold text-dark'>Sign in to your Account</h1>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='fullname' className='form-label'>Full Name</label>
              <input 
              type="text"
              className='form-control'
              id='name'
              placeholder='Jhon doe'
              required
              value={value.name}
              onChange={(e)=> setValue({...value, name:e.target.value})}
              />
              </div>


            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>Your Email</label>
              <input 
              type="email"
              name="email"
              className='form-control'
              id='email'
              placeholder='name@company.com'
              required
              value={value.email}
              onChange={(e)=>setValue({...value, email:e.target.value})}
              />
              </div>

              <div className='mb-3'>
                <label htmlFor='password' className='form-label'>Password</label>
                <input 
                type='password'
                name='password'
                className='form-control'
                id='password'
                placeholder='.........'
                required
                value={value.password}
                onChange={(e)=>setValue({...value, password:e.target.value})}
                />
              </div>

              <button type='submit' className='btn btn-primary w-100'>Sign in</button>
          </form>
         <p className='mt-3 mb-0 text-muted'>
          Already have account? <Link to='/login' className='text-primary'>sign in</Link>
         </p>
        </div>
      </div>  
      </div>
    </section>
    </>
  )
}
