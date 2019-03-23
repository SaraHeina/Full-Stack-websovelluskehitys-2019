import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Recommend from './components/Recommend'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { useApolloClient } from 'react-apollo-hooks'

const ALL_AUTHORS = gql`
  {
    allAuthors {
      name
      born
      id
      bookCount
    } 
  }
`

const ALL_BOOKS = gql`
  {
    allBooks {
      title
      author{name}
      published
      id
      genres
    } 
  }
`

const BOOKS_GENRE_FILTER = gql`
  query booksGenreFilter($genre: String){
    allBooks (genre: $genre){
      title
      author{name}
      published
      genres
    } 
  }
`

const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int, $genres: [String]){
    addBook (
      title: $title
      published: $published
      author: $author
      genres: $genres
    ){
      title
      published
      genres
    }
  }
`

const EDIT_AUTHOR_BORN = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!){
    editAuthor(name: $name, setBornTo: $setBornTo){
      name
      born
      id
      bookCount
    }
  }
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

const ME = gql`
 {
   me {
     favoriteGenre
    }
  }
`

const App = () => {
  const client = useApolloClient()
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [selectGen, setSelectGen] = useState(null)
  const me = useQuery(ME)

  const login = useMutation(LOGIN)

  const allAuthors = useQuery(ALL_AUTHORS)
  const allBooks = useQuery(ALL_BOOKS)
  const booksGenreFilter = useQuery(BOOKS_GENRE_FILTER, { genre: "" })

  const addBook = useMutation(CREATE_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })

  const editAuthor = useMutation(EDIT_AUTHOR_BORN, {
    onError: handleError,
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const handleError = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  const errorNotification = () => errorMessage &&
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommend')}>recommend</button>}
        {!token && <button onClick={() => setPage('login')} > login</button>}
        {token && <button onClick={logout} > logout</button>}
      </div>

      <div>{errorNotification()}</div>

      <Authors
        show={page === 'authors'}
        result={allAuthors}
        editAuthor={editAuthor}
        handleError={handleError}
      />

      <Books
        show={page === 'books'}
        result={allBooks}
        booksGenreFilter={booksGenreFilter}
        selectGen={selectGen}
        setSelectGen={setSelectGen}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
        handleError={handleError}
      />

      <LoginForm
        show={page === 'login'}
        login={login}
        setToken={(token) => setToken(token)}
        handleError={handleError}
        setPage={setPage}
      />

      <Recommend
        show={page === 'recommend'}
        result={allBooks}
        booksGenreFilter={booksGenreFilter}
        selectGen={selectGen}
        setSelectGen={setSelectGen}
        me={me}
      />
    </div>
  )
}

export default App
