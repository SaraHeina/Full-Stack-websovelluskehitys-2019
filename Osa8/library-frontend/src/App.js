import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from 'react-apollo-hooks'

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
      published
      author
      id
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
      author
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


const App = () => {
  const [page, setPage] = useState('authors')

  const allAuthors = useQuery(ALL_AUTHORS)
  const allBooks = useQuery(ALL_BOOKS)

  const addBook = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, {query: ALL_AUTHORS}]
  })

  const editAuthor = useMutation(EDIT_AUTHOR_BORN, {
    refetchQueries: [{query: ALL_AUTHORS}]
  })


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        result={allAuthors}
        editAuthor={editAuthor}
      />

      <Books
        show={page === 'books'}
        result={allBooks}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
      />

    </div>
  )
}

export default App
