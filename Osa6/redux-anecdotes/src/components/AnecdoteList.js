import React from 'react'
import { anecdoteVote } from '../reducers/anecdoteReducer';

const anecdoteList = (props) => {

    const anecdotes = props.store.getState()
    const vote = (id) => {
        props.store.dispatch(anecdoteVote(id))
    }

    return (
        <div>
            {anecdotes.sort((x, y) => y.votes - x.votes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default anecdoteList