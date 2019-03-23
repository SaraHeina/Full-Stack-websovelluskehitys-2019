import React, { useState , useEffect} from 'react'

const Recommend = (props) => {
    if (!props.show) {
        return null
    }
    if (props.booksGenreFilter.loading) {
        return <div>loading...</div>
    }
    if (props.me.loading) {
        return <div>loading...</div>
    }

    const [books, setBooks] = useState([])

    useEffect(() => {data()}, [])

    const data = async () => {
        const favorite = await (props.booksGenreFilter.refetch({ genre: props.me.data.me.favoriteGenre }))
        setBooks(favorite.data.allBooks)
    }

    return (
        <div>
            <h2>Recommendations</h2>
            <h4>books in your favorite genre {props.me.data.me.favoriteGenre}</h4>
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

        </div>
    )
}
export default Recommend