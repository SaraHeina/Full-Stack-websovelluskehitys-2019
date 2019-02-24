import React from 'react'
import { connect } from 'react-redux'
import { anecdoteAdd } from '../reducers/anecdoteReducer'
import { notificationMessage, notificationMessageNull } from '../reducers/notificationReducer'

const anecdoteForm = (props) => {

    const addAnecdote = (event) => {
        event.preventDefault()
        props.anecdoteAdd(event.target.anecdote.value)
        props.notificationMessage(`you created new anecdote: ${event.target.anecdote.value}`)
        setTimeout(() => { props.notificationMessageNull() }, 5000)
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


const mapDispatchToProps = {
    anecdoteAdd,
    notificationMessage,
    notificationMessageNull
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(anecdoteForm)
export default ConnectedAnecdoteForm