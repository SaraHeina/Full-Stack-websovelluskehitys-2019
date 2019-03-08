const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.content
    default:
      return state
  }
}

export const setNotification = (content, seconds, dispatch) => {
  dispatch({
    type: 'SET_NOTIFICATION',
    content
  })
  setTimeout(() => {
    dispatch({
      type: 'SET_NOTIFICATION',
      content: null
    })
  }, seconds * 1000)
}



export default reducer