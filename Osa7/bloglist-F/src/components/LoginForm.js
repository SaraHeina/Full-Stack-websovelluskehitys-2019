import React from 'react'
import { loginUser } from '../reducers/userReducer'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ loginUser }) => {

    const username = useField('text')
    const password = useField('password')

    const login = async (event) => {
        event.preventDefault()
        const user = {
            username: username.value,
            password: password.value
        }
        loginUser(user)
        username.reset()
        password.reset()
    }

    return (
        <Form onSubmit={login}>
            <Form.Group>
                <Form.Label>käyttäjätunnus:</Form.Label>
                <Form.Control
                    id='username'
                    type={username.type}
                    value={username.value}
                    onChange={username.onChange}
                />
                <Form.Label>salasana:</Form.Label>
                <Form.Control
                    id='password'
                    type={password.type}
                    value={password.value}
                    onChange={password.onChange}
                />
                <Button onClick={login}>kirjaudu</Button>
            </Form.Group>
        </Form>
    )
}

LoginForm.propTypes = {
}

export default connect(null, { loginUser })(LoginForm)
