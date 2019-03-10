import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { create } from '../reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'

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
            <Form onSubmit={blogSubmission}>
                <Form.Group>
                    <div>
                        title:
                        <Form.Control
                            id='title'
                            type={title.type}
                            value={title.value}
                            onChange={title.onChange}
                        />
                    </div>
                    <div>
                        author:
                        <Form.Control
                            id='author'
                            type={author.type}
                            value={author.value}
                            onChange={author.onChange}
                        />
                    </div>
                    <div>
                        url:
                        <Form.Control
                            id='url'
                            type={url.type}
                            value={url.value}
                            onChange={url.onChange}
                        />
                    </div>
                    <Button onClick={blogSubmission}>Save</Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default connect(null, { create })(Create)