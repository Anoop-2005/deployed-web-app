import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import Post from './Pages/Post'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Profile from './Pages/Profile'
import UserLayout from './Layouts/UserLayout'
import AdminLayout from './Layouts/AdminLayout'
import Dashboard from './Pages/Admin/Dashboard'
import AddPost from './Pages/Admin/AddPost'
import User from './Pages/Admin/User'
import AllPosts from './Pages/AllPosts'
import {Toaster} from 'react-hot-toast'
import UpdatePost from './Pages/Admin/UpdatePost'
import Info from './Pages/Info'


export default function App() {
  return (
    <>
    <BrowserRouter>
    <Toaster/>
    <Routes>
      <Route path='/' element={<UserLayout/>}>
      <Route index element={<Home/>}/>
      <Route path='/post/:postId' element={<Post/>}/>
      <Route path='/profile/:userId' element={<Profile/>}/>
      <Route path='/info' element={<Info/>}/>
      </Route>
      
      <Route path='/dashboard' element={<AdminLayout/>}>
      <Route index element={<Dashboard/>}/>
      <Route path='addpost' element={<AddPost/>}/>
      <Route path='users' element={<User/>}/>
      <Route path='allposts' element={<AllPosts/>}/>
      <Route path="updatepost/:id" element={<UpdatePost />} />
      

      
      </Route>


      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      
      


    </Routes>
    </BrowserRouter>
    </>
  )
}
