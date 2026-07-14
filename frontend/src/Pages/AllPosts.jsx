import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { BaseUrl, dele, get, patch} from '../services/Endpoint'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function AllPosts() {
  const [posts, setPosts] = useState([])
  const [loadedata, setLoadedata]=useState(false)
  const navigate = useNavigate();

  const handleDelete = async(postId) => {
    const confirmed=window.confirm('Are you sure you want to delete this Post ');

    if (confirmed) {
      try {
        const response = await dele(`/blog/delete/${postId}`);
        const data=response.data;

        if (data.success) {
          toast.success(data.message);
          setLoadedata(!loadedata);
        
        }else {
          toast.error('Failed to delete the Post');
        }
      } catch (error) {
        console.error('Error Deleting the Post', error)

        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message)
        }else {
          toast.error('Unexpected Errr');
        }
        
      }
    }
  };

  const handleUpdate=(postId)=>{
    navigate(`/dashboard/updatepost/${postId}`);
  }

  useEffect(()=>{
    const getposts=async()=>{
      try {
        const response=await get("/blog/getposts")
        const data = response.data
        setPosts(data.posts)
        console.log(data)
      } catch (error) {
        console.log(error)
        
      }
    }
    getposts()
  },[loadedata])

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
    <h1 className='text-center mb-4 text-black'>All Posts</h1>
    <div className='row'>
      {posts && posts.map((post)=> (
        <div className='col-md-4 mb-4 col-lg-4 col-12' key={post._id}>
        <div className='card h-100'>
          <div className='card-body'>
            <h5 className='card-title'>{post.title}</h5>
            <p className='card-text'>{truncateText(post.desc, 30)}</p>
          </div>
          <div className='card-footer d-flex justify-content-between'>
            <button
            className='btn btn-danger'
            onClick={()=>handleDelete(post._id)}
            >
              <FaTrashAlt/>Delete
            </button>
            <button className='btn btn-warning'
            onClick={()=>handleUpdate(post._id)}
            >
              <FaEdit/>Update
            </button>
          </div>

        </div>
      </div>

      ))}
      
    </div>
   </div>
   </>
  )
}
