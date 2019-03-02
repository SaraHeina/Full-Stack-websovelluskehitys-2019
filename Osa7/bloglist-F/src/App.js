import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Create from './components/Create'
import Message from './components/Message'
import Togglable from './components/Togglable'
import { useField } from './hooks'
import { setNotification } from './reducers/notificationReducer'
import Notification from './components/Notification'
import { connect } from 'react-redux'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const uname = useField('text')
  const pword = useField('password')

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogSubmission = async (event) => {
    event.preventDefault()
    try {
      const blogAd = await blogService.create({
        title: title.value,
        author: author.value,
        url: url.value
      })
      blogFormRef.current.toggleVisibility()
      title.reset()
      author.reset()
      url.reset()
      setBlogs(blogs.concat(blogAd))
      setSuccessMessage(`a new blog ${title.value} by ${author.value} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('antamasi vastaukset eivät kelpaa')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    }
  }

  const deletion = async (blog) => {
    if (window.confirm(`delete ${blog.title}?`)) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(x => x !== blog))
      } catch (error) {
        console.log(error)
      }
    }
  }

  const login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: uname.value,
        password: pword.value,
      })
      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      uname.reset()
      pword.reset()
    } catch (exception) {
      setNotification('käyttäjätunnus tai salasana virheellinen', 5)
      /*setErrorMessage('käyttäjätunnus tai salasana virheellinen')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)*/
    }
  }

  const logout = async () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  //<Message.Error error={errorMessage} /> <Notification/> 
  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm
          login={login}
          username={uname}
          password={pword}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Message.Error error={errorMessage} />
      <Message.Mes message={successMessage} />
      <p>{user.name} logged in</p>

      <button onClick={logout}>logout</button>

      <Togglable buttonLabel='create new' ref={blogFormRef} titl={title} aut={author} ur={url}>
        <h2>create new</h2>
        <Create
          blogSubmission={blogSubmission}
          title={title}
          author={author}
          url={url}
        />
      </Togglable>
      {blogs.sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog} user={user} deletion={deletion} />
        )}
    </div>
  )
}

const mapStateToProps = state => ({
  notification: state.notification
})

const mapDispatchToProps = {
  setNotification,
}



export default connect(mapStateToProps, mapDispatchToProps)(App)