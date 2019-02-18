import React from 'react'


const Remove = ({ blog, user, deletion }) => {
    if (!blog.user) {
        return (<button onClick={() => deletion(blog)}>remove</button>) 
    }
    if (blog.user.username !== user.username) {
        return(null)
    }
    
    return (<button onClick={() => deletion(blog)}>remove</button>) }


export default Remove