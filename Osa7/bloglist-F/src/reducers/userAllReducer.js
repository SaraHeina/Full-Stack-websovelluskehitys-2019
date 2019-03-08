import usersService from '../services/users'

const userAllReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_ALL':
            return action.content
        default:
            return state
    }
}

export const getAllUsers = () => {
    return async dispatch => {
        const content = await usersService.getAll()
        dispatch({ type: 'GET_ALL', content})
    }
}

export default userAllReducer