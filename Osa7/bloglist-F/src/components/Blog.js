import React, { useState } from 'react'
import blogService from '../services/blogs'
import Remove from './Remove'

const Blog = ({ blog, user, deletion }) => {
  const [showDetail, setShowDetail] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  if (!showDetail) {
    return (
      <div style={blogStyle}>
        <div onClick={() => setShowDetail(true)} className='onlyTitle'>
          {blog.title} {blog.author}
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle} className='detailed'>
      <div onClick={() => setShowDetail(false)}>
        <div>{blog.title}</div>
        <div>{blog.url}</div>
        <div>{blog.likes} likes
          <button onClick={() => blogService.like(blog)}>like</button>
        </div>
        <div>added by {blog.author}</div>
        <Remove
          blog={blog}
          user={user}
          deletion={deletion} />
      </div>
    </div>
  )
}

export default Blog