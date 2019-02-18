import React from 'react'

const Mes = ({ message }) => {
    if (!message) { return null }
    return (
        <div className="success">{message}</div>
    )
}

const Error = ({ error }) => {
    if (!error) { return null }
    return (
        <div className="error">{error}</div>
    )
}

export default { Mes, Error }