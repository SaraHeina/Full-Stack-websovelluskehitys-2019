import React from 'react'
import { removeBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'


const Remove = ({ blog, user, removeBlog }) => {

    if (!blog.user) {
        return (
            <Button onClick={() => {
                window.location.reload()
                removeBlog(blog)
            }}>remove</Button>
        )
    }

    if (blog.user.username !== user.username) {
        return (null)
    }

    return (
        <div>
            <Button onClick={() => {
                window.location.reload()
                removeBlog(blog)
            }}>remove</Button>
        </div>
    )
}

export default connect(null, { removeBlog })(Remove)