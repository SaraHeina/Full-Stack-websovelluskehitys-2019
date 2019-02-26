import anecdoteService from '../services/anecdotes'


const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      return state.map(sta => (sta.id === action.id ? action.data : sta))
    case 'ADD':
      return [...state, action.data]
    case 'INIT_NOTES':
      return action.data
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: anecdotes,
    })
  }
}

export const anecdoteVote = (anecdote) => {
  return async dispatch => {
    await anecdoteService.voteAnecdote(anecdote.id, anecdote)
    dispatch({
      type: 'VOTE',
      data: anecdote
    })
  }
}

export const anecdoteAdd = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD',
      data: newAnecdote
    })
  }
}

export default reducer