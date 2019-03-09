import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const User = ({ users }) => {
    return (
        <div>
            <h2>Users</h2>
            <Table striped>
                <tbody>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                    {users.map(u =>
                        <tr key={u.id}>
                            <td>
                                <Link to={`/users/${u.id}`}>{u.name}</Link>
                            </td>
                            <td>{u.blogs.length}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

const mapStateToProps = state => ({
    users: state.users
})

export default connect(mapStateToProps)(User)