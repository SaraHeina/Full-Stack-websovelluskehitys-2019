import React, { useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Create from './components/Create'
import Togglable from './components/Togglable'
import { initializeBlogs } from './reducers/blogReducer'
import Notification from './components/Notification'
import { connect } from 'react-redux'
import ErrorMessage from './components/ErrorMessage'
import BlogAll from './components/BlogAll'
import { setUser } from './reducers/userReducer'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import Users from './components/Users'
import { getAllUsers } from './reducers/userAllReducer'
import OneUser from './components/OneUser'
import Blog from './components/Blog'
import { Button, Navbar, Nav } from 'react-bootstrap'


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


  const padding = { padding: 5 }

  if (user === null) {
    return (
      <Router>
        <div className="container">
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
    <div className="container">
      <Router>
        <div>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/">Blogs</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/users">Users</Link>
                </Nav.Link>
                <Button onClick={logout}>logout</Button>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <h2>Blogs</h2>
          <ErrorMessage />
          <Notification />
          <Route exact path="/" render={() =>
            <>
              <Togglable buttonLabel='create new' ref={blogFormRef}>
                <h2>create new</h2>
                <Create blogFormRef={blogFormRef} />
              </Togglable>
              <BlogAll />
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