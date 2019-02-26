import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import anecReducer from './reducers/anecdoteReducer'
import notiReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
    anecdotes: anecReducer,
    notification: notiReducer,
    filter: filterReducer
  })

const store = createStore(reducer, applyMiddleware(thunk))

export default store