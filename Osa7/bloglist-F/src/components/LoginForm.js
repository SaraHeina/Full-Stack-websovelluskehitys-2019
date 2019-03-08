import React from 'react'
import { loginUser } from '../reducers/userReducer'
import { connect } from 'react-redux'
import { useField } from '../hooks'

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
        <form onSubmit={login}>
            <div>
                käyttäjätunnus
          <input
                    type={username.type}
                    value={username.value}
                    onChange={username.onChange}
                />
            </div>
            <div>
                salasana
          <input
                    type={password.type}
                    value={password.value}
                    onChange={password.onChange}
                />
            </div>
            <button onSubmit={login}>kirjaudu</button>
        </form>
    )
}

LoginForm.propTypes = {
}

export default connect(null, { loginUser })(LoginForm)
