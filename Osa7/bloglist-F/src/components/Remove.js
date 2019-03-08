import React from 'react'
import { removeBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'


const Remove = ({ blog, user, removeBlog }) => {

    if (!blog.user) {
        return (
            <button onClick={() => {
                removeBlog(blog)
                window.location.reload()
            }}>remove</button>
        )
    }
    if (blog.user.username !== user.username) {
        return (null)
    }

    return (
        <button onClick={() => {
            removeBlog(blog)
            window.location.reload()
        }}>remove</button>
    )
}

export default connect(null, { removeBlog })(Remove)