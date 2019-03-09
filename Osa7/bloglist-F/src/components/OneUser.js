import React from 'react'
import { connect } from 'react-redux'

const OneUser = ({ id, users }) => {
    const user = users.find(u => u.id === id)
    if (user === undefined) {
        return null
    }
    return (
        <div>
            <h2>{user.name}</h2>
            <h4>added blogs</h4>
            <ul>
                {user.blogs.map(b =>
                    <li key={b.id}>{b.title}</li>)}
            </ul>
        </div>
    )
}

const mapStateToProps = state => ({
    users: state.users
})

export default connect(mapStateToProps)(OneUser)