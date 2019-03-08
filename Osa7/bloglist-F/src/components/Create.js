import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { create } from '../reducers/blogReducer'

const Create = ({ create, blogFormRef }) => {

    const title = useField('text')
    const author = useField('text')
    const url = useField('text')

    const blogSubmission = async (event) => {
        event.preventDefault()
        const blogAd = {
            title: title.value,
            author: author.value,
            url: url.value
        }
        blogFormRef.current.toggleVisibility()
        create(blogAd)

        title.reset()
        author.reset()
        url.reset()
    }

    return (
        <div>
            <form onSubmit={blogSubmission}>
                <div>
                    title:
            <input
                        type={title.type}
                        value={title.value}
                        onChange={title.onChange}
                    />
                </div>
                <div>
                    author:
            <input
                        type={author.type}
                        value={author.value}
                        onChange={author.onChange}
                    />
                </div>
                <div>
                    url:
            <input
                        type={url.type}
                        value={url.value}
                        onChange={url.onChange}
                    />
                </div>
                <button onClick={blogSubmission}>create</button>
            </form>
        </div>
    )
}

export default connect(null, { create })(Create)