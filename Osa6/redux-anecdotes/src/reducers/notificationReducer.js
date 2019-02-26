
const notiReducer = (state = null, action) => {
    switch (action.type) {
        case 'MESSAGE':
            return action.message
        default:
            return state
    }
}

export const notificationMessage = (message, luku) => {
    return async dispatch => {
        dispatch({
            type: 'MESSAGE',
            message
        })
        await setTimeout(() => { 
            dispatch({
                type: 'MESSAGE',
                message: null
            }) }, 
            luku * 1000)
    }
}

export default notiReducer