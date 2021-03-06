import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part name={props.parts[0].name} exersises={props.parts[0].exercises} />
            <Part name={props.parts[1].name} exersises={props.parts[1].exercises} />
            <Part name={props.parts[2].name} exersises={props.parts[2].exercises} />
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>
                {props.name} {props.exersises}
            </p>
        </div>
    )
}

const Total = (props) => {
    return (
        <div>
            <p>yhteensä {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} tehtävää</p>
        </div>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
            {
                name: 'Reactin perusteet',
                exercises: 10
            },
            {
                name: 'Tiedonvälitys propseilla',
                exercises: 7
            },
            {
                name: 'Komponenttien tila',
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
