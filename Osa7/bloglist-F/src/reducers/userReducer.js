import loginService from '../services/login'
import {setErrorMessage} from '../reducers/errorMessageReducer'
import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.user
        default:
            return state
    }
}

export const setUser = (user) => {
    return async dispatch => {
        dispatch({
            type: 'SET_USER',
            user
        })
    }
}

export const loginUser = (loger) => {
    return async dispatch => {
        try {
        const user = await loginService.login(loger)
        blogService.setToken(user.token)
        dispatch({
            type: 'SET_USER',
            user
        })
        window.localStorage.setItem('loggedUser', JSON.stringify(user))
        } catch (error) {
            setErrorMessage('käyttäjätunnus tai salasana virheellinen', 5, dispatch)
        }
    }
}

export default userReducer