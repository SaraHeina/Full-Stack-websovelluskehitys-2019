
const notiReducer = (state = null, action) => {
    switch (action.type) {
        case 'MESSAGE':
            return action.message
        default:
            return state
    }
}

export const notificationMessage = (message) => {
    return {
        type: 'MESSAGE',
        message
    }
}

export const notificationMessageNull = () => {
    return {
        type: 'MESSAGE',
        message: null
    }
}

export default notiReducer