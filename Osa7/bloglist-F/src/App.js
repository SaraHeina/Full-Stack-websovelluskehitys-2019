import React, { useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Create from './components/Create'
import Togglable from './components/Togglable'
import { initializeBlogs } from './reducers/blogReducer'
import Notification from './components/Notification'
import { connect } from 'react-redux'
import ErrorMessage from './components/ErrorMessage';
import BlogAll from './components/BlogAll'
import { setUser } from './reducers/userReducer'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import Users from './components/Users';
import { getAllUsers } from './reducers/userAllReducer'
import OneUser from './components/OneUser'
import Blog from './components/Blog';


const App = ({ initializeBlogs, setUser, user, getAllUsers }) => {
  const blogFormRef = React.createRef()

  useEffect(() => {
    initializeBlogs()
    getAllUsers()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const userJ = JSON.parse(loggedUserJSON)
      setUser(userJ)
      blogService.setToken(userJ.token)
    }
  }, [])


  const logout = async () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }
  

  const padding = { backgroundColor: '#DCDDDF', padding: 5 }

  if (user === null) {
    return (
      <Router>
        <div>
          <div>
            <h2>log in to application</h2>
            <ErrorMessage />
            <LoginForm />
            <Route path="/users" render={() => <Redirect to="/" />} />
            <Route path="/blogs" render={() => <Redirect to="/" />} />
          </div>
        </div>
      </Router>
    )
  }

  return (
    <div>
      <Router>
        <div>
          <div style={padding}>
            <Link to="/">blogs</Link>
            <Link style={{ paddingRight: 5, paddingLeft: 5 }} to="/users">users</Link>
            <>{user.name} logged in</>
            <button onClick={logout}>logout</button>
          </div>
          <h2>blogs</h2>
          <ErrorMessage />
          <Notification />
          <Route exact path="/" render={() =>
            <>
              <Togglable buttonLabel='create new' ref={blogFormRef}>
                <h2>create new</h2>
                <Create blogFormRef={blogFormRef} />
              </Togglable>
              <BlogAll user={user} />
            </>
          } />
          <Route exact path="/users" render={() => <Users />} />
          <Route path="/users/:id" render={({ match }) => <OneUser id={match.params.id} />} />
          <Route path="/blogs/:id" render={({ match }) => <Blog id={match.params.id} />} />
        </div>
      </Router>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = {
  initializeBlogs,
  setUser,
  getAllUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(App)