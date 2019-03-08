import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogAll = ({ blogs, user }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div>
            {blogs.sort((a, b) => b.likes - a.likes)
                .map(blog =>
                    <div key={blog.id} style={blogStyle}>
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </div>
                )}
        </div>
    )
}

const mapStateToProps = state => ({
    blogs: state.blogs
})

export default connect(mapStateToProps)(BlogAll)