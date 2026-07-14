import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BaseUrl, get } from '../services/Endpoint.js'

export default function RecentPost() {
    const navigate =useNavigate()
    const [post, setPost] = useState([])
    
    const handlevaigte=(id)=>{
        navigate(`/post/${id}`)

    }
    const getpost = async ()=>{
        try {
            const response = await get('/blog/Getposts');
            const data = response.data;
            setPost(data.posts)
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getpost();
    },[]);

    //helper to truncate text 
    const truncateText=(text, wordLimit)=>{
        const words=text.split(" ");
        if (words.length > wordLimit) {
            return words.slice(0,wordLimit).join(' ')+ '...';
        }
        return text;
    }


  return (
    <>
    <div className='conatiner'>
        <div className='mb-5 text-center' >
            <h2 className='fw-bold fs-1 text-black'>Recent Posts</h2>
        </div>

        <div className='row' >
            {post && post.map((post, index)=>{
                return (
                    <div key ={post._id} className='col-md-4 col-lg-4 col-xs-12 mb-4'>
                <div className='card border-success' style={{borderWidth:"2px", backgroundColor:"#2b2b2b", borderRadius:"10px", overflow:"hidden"}}>
                    <div className='card-body bg-dark text-white'>
                        <h5 className='card-title'>{post.title}</h5>
                        <p className='card-text'>{truncateText(post.desc, 30)}</p>
                        <button className='btn btn-primary w-100 mt-3 ' onClick={()=>handlevaigte(post._id)}>Read Article</button>
                    </div>
                </div>
            </div>

                )
            })}
            
        </div>
    </div>
    
    </>
  )
}
