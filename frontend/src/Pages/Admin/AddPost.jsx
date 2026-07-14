import React, { useState } from 'react'
import { post } from '../../services/Endpoint';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function AddPost() {
  const [title, setTitle]=useState('');
  const [description, setDescription] = useState('');
  
  console.log('image', image)

  const navigate= useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const formData = new FormData();
      
      formData.append('title', title);
      formData.append('desc', description);

      formData.forEach((value, key)=>{
        console.log(`${key}:${value}`);
      });

      const response = await post('/blog/create', formData);
      const data = response.data;
      if (data.success) {
        toast.success(data.message)
        setTitle('')
        setDescription('')
        navigate('/dashboard/allposts');
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      
    }
  }



  return (
    <>
     <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-6 col-lg-6'>
          <div className='card shadow-lg'>
            <div className='card-header bg-primary text-black'>
              <h2 className='text-center mb-0'>Add new Post</h2>
            </div>
            <div className='card-body p-4'>
              <div method='post' encType='multipart/form-data'>
              
              <div className='mb-4'>
                <label htmlFor='postTitle' className='form-label'>Title</label>
                <input
                  type="text"
                  className='form-control'
                  id="postTitle"
                  placeholder='Enter post Title'
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                  required
                />
              </div>

              <div className='mb-4'>
                <label htmlFor='postDescription' className='form-label'>Description</label>
                <textarea 
                  className='form-control'
                  id='postDescription'
                  row="6"
                  placeholder='Write the Post Description here'
                  required
                  value={description}
                  onChange={(e)=>setDescription(e.target.value)}
                  ></textarea>
              </div>

              <div className='d-grid'>
                <button type='submit' className='btn btn-primary btn-lg' onClick={handleSubmit}>Submit Post</button>
              </div>
            
              </div>
            </div>
          </div>

        </div>

      </div>
     </div>
        
    </>
  )
}
