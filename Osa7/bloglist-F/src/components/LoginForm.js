import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
    login,
    username,
    password
}) => {
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
            <button type="submit">kirjaudu</button>
        </form>
    )
}

LoginForm.propTypes = {
    login: PropTypes.func.isRequired,
    username: PropTypes.object.isRequired,
    password: PropTypes.object.isRequired,
}

export default LoginForm
