import React from 'react'

const Header = (props) =>
    <h1>{props.course}</h1>

const Total = (props) => {
    let total = props.parts.reduce((s, p) => s + p.exercises, 0)

    return <p>yhteensä {total} tehtävää</p>
}


const Part = (props) =>
    <p>{props.part.name} {props.part.exercises}</p>

const Content = (props) => (
    <div>
        {props.parts.map(part => <Part key={part.id} part={part} />)}
    </div>
)

const Course = (props) => {
    return (
        <div>
            <Header course={props.course.name} />
            <Content parts={props.course.parts} />
            <Total parts={props.course.parts} />
        </div>
    )
}

export default Course