import React from 'react'
import { anecdoteAdd } from '../reducers/anecdoteReducer';

const anecdoteForm = (props) => {

    const addAnecdote = (event) => {
        event.preventDefault()
        props.store.dispatch(anecdoteAdd(event.target.anecdote.value))
        event.target.anecdote.value = ''
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default anecdoteForm