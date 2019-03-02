const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.content
    default:
      return state
  }
}

export const setNotification = (content, seconds) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      content
    })
    await setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        content: null
      })
    }, seconds * 1000)
  }

}


export default reducer