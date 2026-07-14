import React, { useState } from 'react'
import { post } from '../../services/Endpoint';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function AddPost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await post('/blog/create', {
        title,
        desc: description
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = response.data;

      if (data.success) {
        toast.success(data.message);
        setTitle('');
        setDescription('');
        navigate('/dashboard/allposts');
      }

      console.log(data);

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Unexpected Error"
      );
    }
  };


  return (
    <>
      <div className='container mt-5'>
        <div className='row justify-content-center'>
          <div className='col-md-6 col-lg-6'>

            <div className='card shadow-lg'>

              <div className='card-header bg-primary text-black'>
                <h2 className='text-center mb-0'>
                  Add New Post
                </h2>
              </div>

              <div className='card-body p-4'>

                <form 
                  onSubmit={handleSubmit}
                >

                  <div className='mb-4'>
                    <label 
                      htmlFor='postTitle' 
                      className='form-label'
                    >
                      Title
                    </label>

                    <input
                      type="text"
                      className='form-control'
                      id="postTitle"
                      placeholder='Enter post title'
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>


                  <div className='mb-4'>
                    <label 
                      htmlFor='postDescription' 
                      className='form-label'
                    >
                      Description
                    </label>

                    <textarea
                      className='form-control'
                      id='postDescription'
                      rows="6"
                      placeholder='Write the post description here'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>


                  <div className='d-grid'>
                    <button 
                      type='submit' 
                      className='btn btn-primary btn-lg'
                    >
                      Submit Post
                    </button>
                  </div>


                </form>

              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  )
}