import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
    const good = props.good
    const neutral = props.neutral
    const bad = props.bad
    const all = props.good + props.bad + props.neutral

    if (all === 0) {
        return (
            <div>
                <p>Ei yhtään palautetta annettu</p>
            </div>
        )
    }
    else {
        return (
            <table>
                <tbody>
                    <Statistic text='hyvä' number={good} />
                    <Statistic text='neutraali' number={neutral} />
                    <Statistic text='huono' number={bad} />
                    <Statistic text='yhteensä' number={all} />
                    <Statistic text='keskiarvo' number={(good - bad) / all} />
                    <Statistic text='positiivisia' number={((good / all) * 100) + ' %'} />
                </tbody>
            </table>
        )
    }
}

const Statistic = ({ text, number }) => (
    <tr>
        <td>{text} </td>
        <td>{number}</td>
    </tr>
)


const Button = ({ clikc, text }) => (
    <button onClick={clikc}>
        {text}
    </button>
)

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const goodClick = () => {
        setGood(good + 1)
    }

    const neutralClick = () => {
        setNeutral(neutral + 1)
    }
    const badClick = () => {
        setBad(bad + 1)
    }

    return (
        <div>
            <h2>Anna palautetta</h2>
            <Button clikc={goodClick} text='Hyvä' />
            <Button clikc={neutralClick} text='Neutraali' />
            <Button clikc={badClick} text='Huono' />
            <h2>Statistiikka</h2>
            <Statistics good={good} bad={bad} neutral={neutral} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)
