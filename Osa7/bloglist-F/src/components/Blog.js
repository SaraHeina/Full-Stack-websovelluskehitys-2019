import React from 'react'
import { useField } from '../hooks'
import Remove from './Remove'
import { connect } from 'react-redux'
import { likeBlog, addComment } from '../reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'

const Blog = ({ id, blogs, likeBlog, addComment }) => {

  const comment = useField('text')
  const blog = blogs.find(b => b.id === id)

  if (blog === undefined) {
    return null
  }

  const commentSubmission = async (event) => {
    event.preventDefault()
    addComment(id, comment)
    comment.reset()
}

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes
          <button onClick={() => likeBlog(blog)}>like</button>
      </div>
      <div>added by {blog.author}</div>
      <br/>
      <Remove
        blog={blog}
        user={blog.user} />
      <h3>comments</h3>
      <Form onSubmit={commentSubmission}>
        <div>
            <Form.Control
            type={comment.type}
            value={comment.value}
            onChange={comment.onChange}
          />
          <Button onClick={commentSubmission}>add comment</Button>
        </div>
      </Form>
      <br/>
      <ul>
        {blog.comments.map((comment, index) =>
          <li key={index}>{comment}</li>)}
      </ul>
    </div>
  )
}

const mapStateToProps = state => ({
  blogs: state.blogs
})

export default connect(mapStateToProps, { likeBlog, addComment })(Blog)