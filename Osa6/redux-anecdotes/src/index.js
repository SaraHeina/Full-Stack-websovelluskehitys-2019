import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import App from './App'
import { Provider } from 'react-redux'
import anecReducer from './reducers/anecdoteReducer'
import notiReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  anecdotes: anecReducer,
  notification: notiReducer,
  filter: filterReducer
})

const store = createStore(reducer)

//const render = () => {
  ReactDOM.render(
    <Provider store={store}>
    <App />
  </Provider>,
    document.getElementById('root')
  )
//}

//render()
//store.subscribe(render)