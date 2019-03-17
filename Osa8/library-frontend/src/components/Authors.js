import React, { useState } from 'react'
import Select from 'react-select'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState('')

  if (!props.show) {
    return null
  }

  const handleChange = (target) => {
    setName(target.value)
    setSelectedOption(target)
  }

  const submit = async (e) => {
    e.preventDefault()

    await props.editAuthor({
      variables: { name, setBornTo: parseInt(born) }
    })

    setName('')
    setBorn('')
    setSelectedOption('')
  }

  const { data } = props.result
  const authors = data.allAuthors

  if (props.result.loading) {
    return <div>loading...</div>
  }
  
  const options = authors.map(a => ({ value: a.name, label: a.name }))


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
          <Select
              value={selectedOption}
              onChange={handleChange}
              options={options}
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