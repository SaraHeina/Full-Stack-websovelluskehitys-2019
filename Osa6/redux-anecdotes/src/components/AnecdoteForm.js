import React from 'react'
import { connect } from 'react-redux'
import { anecdoteAdd } from '../reducers/anecdoteReducer'
import { notificationMessage } from '../reducers/notificationReducer'

const anecdoteForm = (props) => {

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.anecdoteAdd(content)
        props.notificationMessage(`you created new anecdote: ${content}`, 5)
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


const mapDispatchToProps = {
    anecdoteAdd,
    notificationMessage
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(anecdoteForm)
export default ConnectedAnecdoteForm