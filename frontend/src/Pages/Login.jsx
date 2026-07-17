import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { post } from '../services/Endpoint.js';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/AuthSlice.js';

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [value, setValue]= useState({
    email:"",
    password:""
  });

  const handlechange=(e)=>{
    setValue({
      ...value,
      [e.target.name]:e.target.value
    });
  };

  const handleSubmit=async(e)=>{
    try {
      e.preventDefault();
      const request= await post('auth/login',value);
      const response = request.data;
      console.log("Login Success", response);
      if (request.status===200){
        dispatch(setUser(response.user));
        navigate('/')
        toast.success(response.message)
        
      }
    } catch (error) {
      console.log('login error', error);
      if (error.response && error.response.data && error.response.data.message) {
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
          <img className='me-2' src="https://www.svgrepo.com/show/506725/login.svg" alt="logo" width="32" height="32"/>
          <span className='h4 mb-0 fw-bold'>Enjoying Computer Science?</span></Link>
      
        <div className='card shadow-sm w-100' style={{ maxWidth: '400px'}}>
        <div className='card-body p-4'>
          <h1 className='h5 mb-4 fw-bold text-dark'>Sign in to your Account</h1>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>Your Email</label>
              <input 
              type="email"
              name="email"
              onChange={handlechange}
              className='form-control'
              id='email'
              placeholder='name@company.com'
              required
              value={value.email}
              />
              </div>

              <div className='mb-3'>
                <label htmlFor='password' className='form-label'>Password</label>
                <input 
                type='password'
                onChange={handlechange}
                value={value.password}
                name='password'
                className='form-control'
                id='password'
                placeholder='*********'
                required
                />
              </div>
              <div className='d-flex justify-content-between align-items-center mb-3'>
                {/*if to add somethnng*/}
              </div>

              <button type='submit' className='btn btn-primary w-100'>Sign in</button>

          </form>
          <p className='mt-3 mb-0 text-muted'>
            Dont't have account yet?<Link to='/register' className='text-primary'>Sign Up</Link> 
          </p>
        </div>
      </div>  
      </div>
    </section>
    </>
  )
}
