import React from 'react'
import { anecdoteVote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { notificationMessage } from '../reducers/notificationReducer'

const anecdoteList = (props) => {

    const vote = (anecdote) => {
        props.anecdoteVote(anecdote)
        props.notificationMessage(`you voted "${anecdote.content}"`, 5)
    }

    return (
        <div>
            {props.anecdotesToShow.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

const anecdotesToShow = (anecdotes, filter) => {
    return anecdotes
        .filter(ane => ane.content.toLowerCase().includes(filter.toLowerCase()))
        .sort((x, y) => y.votes - x.votes)
}

const mapStateToProps = (state) => {
    return {
        anecdotesToShow: anecdotesToShow(state.anecdotes, state.filter),
    }
}

const mapDispatchToProps = {
    anecdoteVote,
    notificationMessage
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(anecdoteList)
export default ConnectedAnecdotes