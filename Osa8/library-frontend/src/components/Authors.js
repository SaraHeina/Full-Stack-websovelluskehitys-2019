import React, { useState } from 'react'
import { useApolloClient } from 'react-apollo-hooks'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  if (!props.show) {
    return null
  }

  const submit = async (e) => {
    e.preventDefault()

    await props.editAuthor({
      variables: { name, setBornTo: parseInt(born) }
    })

    setName('')
    setBorn('')
  }

  const client = useApolloClient()

  const { data } = props.result
  const authors = data.allAuthors

  if (props.result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <div>
        <form onSubmit={submit}>
          <div>
            name
          <input
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </div>
          <div>
            born
          <input
              type='number'
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>

    </div>
  )
}

export default Authors