import React from 'react'

const Create = ({
  blogSubmission,
  title,
  author,
  url,
}) => { return (
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
            <button type="submit">create</button>
        </form>
            </div>
    )
}

export default Create