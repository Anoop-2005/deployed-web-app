import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { get, patch } from '../../services/Endpoint'
import toast from 'react-hot-toast'

export default function UpdatePost() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await get(`/public/singlepost/${id}`)
        const post = res.data.Post
        setTitle(post.title)
        setDesc(post.desc)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPost()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('title', title)
      formData.append('desc', desc)

      const response = await patch(`/blog/update/${id}`, formData)

      if (response.data.success) {
        toast.success(response.data.message)
        navigate('/dashboard/allposts')
      } else {
        toast.error('Update failed')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || 'Unexpected Error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-black">Update Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label text-black">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-black">Description</label>
          <textarea
            className="form-control"
            rows="5"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Updating...' : 'Update Post'}
        </button>
      </form>
    </div>
  )
}