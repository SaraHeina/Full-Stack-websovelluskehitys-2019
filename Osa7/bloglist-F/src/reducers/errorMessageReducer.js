const errorMessageReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_ERROR':
      return action.content
    default:
      return state
  }
}

export const setErrorMessage = (content, seconds, dispatch) => {
  dispatch({
    type: 'SET_ERROR',
    content
  })
  setTimeout(() => {
    dispatch({
      type: 'SET_ERROR',
      content: null
    })
  }, seconds * 1000)
}


export default errorMessageReducer