import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'
import { setErrorMessage } from './errorMessageReducer'

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'INITIALIZEBLOGS':
            return action.blogs
        case 'CREATE':
            return state.concat(action.blogAd)
        case 'REMOVEBLOG':
            return state.filter(b => b !== action.blog)
        case 'LIKE':
            return state.map(b => b.id !== action.blog.id ? b : action.blog)
        case 'ADD_COMMENT':
            return state.map(b => b.id !== action.blogCom.id ? b : action.blogCom)
        default:
            return state
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({ type: 'INITIALIZEBLOGS', blogs })
    }
}

export const create = (blog) => {
    return async dispatch => {
        try {
            const blogAd = await blogService.create(blog)
            dispatch({ type: 'CREATE', blogAd })
            setNotification(`a new blog ${blogAd.title} by ${blogAd.author} added`, 5, dispatch)
        } catch (error) {
            setErrorMessage('antamasi vastaukset eivät kelpaa', 5, dispatch)
        }
    }
}

export const addComment = (id, comment) => {
    return async dispatch => {
        try {
            const blogCom = await blogService.addComment(id, comment.value)
            dispatch({ type: 'ADD_COMMENT', blogCom })
            setNotification(`a new comment ${comment.value} added`, 5, dispatch)
        } catch (error) {
            setErrorMessage('antamasi vastaukset eivät kelpaa', 5, dispatch)
        }
    }
}

export const removeBlog = (blog) => {
    if (window.confirm(`delete ${blog.title}?`)) {
        return async dispatch => {
            try {
                await blogService.remove(blog.id)
                dispatch({ type: 'REMOVEBLOG', blog })
            } catch (error) {
                console.log(error)
            }
        }
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        await blogService.like(blog)
        dispatch({ type: 'LIKE', blog })
    }
}

export default blogReducer