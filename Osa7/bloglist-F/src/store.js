import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import errorMessageReducer from './reducers/errorMessageReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer';
import userAllReducer from './reducers/userAllReducer';

const reducer = combineReducers({
    notification: notificationReducer,
    errorMessage: errorMessageReducer,
    blogs: blogReducer,
    user: userReducer,
    users: userAllReducer
})

const store = createStore(
    reducer,
    applyMiddleware(thunk)
)

export default store