import React, { useState } from 'react'

const LoginForm = (props) => {
    if (!props.show) {
        return null
    }

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submit = async (event) => {
        event.preventDefault()

        try {
            const result = await props.login({
                variables: { username, password }
            })

            const token = result.data.login.value

            props.setToken(token)
            localStorage.setItem('libary-user-token', token)
            setUsername('')
            setPassword('')
            props.setPage('authors')
        } catch (error) {
            props.handleError(error.graphQLErrors[0].message)
        }
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    username <input
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password <input
                        type='password'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default LoginForm