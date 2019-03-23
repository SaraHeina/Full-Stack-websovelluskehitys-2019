import React, { useState }  from 'react'

const Books = (props) => {
  if (!props.show) {
    return null
  }

  const { data, error } = props.result

  if (error) {
    return <div>error</div>
  }
  if (props.result.loading) {
    return <div>loading...</div>
  }

  const [books, setBooks] = useState(data.allBooks)
  const genres = [...new Set(data.allBooks.reduce((res, b) => res = [...res, ...b.genres], []))]

  const HashChangeGenre = async (genre) => {
    if (genre === '') {
      setBooks(data.allBooks) 
    } else {
      const joice = await props.booksGenreFilter.refetch({genre: genre})
      setBooks(joice.data.allBooks)
    }
    props.setSelectGen(genre)
  }


  return (
    <div>
      <h2>books</h2>
      <h4>in genre {props.selectGen ? props.selectGen : 'all genres'}</h4>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {genres.map(gen => <button key={gen} onClick={() => HashChangeGenre(gen)}>{gen}</button>)}
      </div>
      <div>
        <button key='all' onClick={() => HashChangeGenre('')}>all genres</button>
      </div>
    </div>
  )
}

export default Books