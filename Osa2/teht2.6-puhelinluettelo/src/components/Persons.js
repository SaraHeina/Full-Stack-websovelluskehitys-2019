import React from 'react'

const Persons = ({ persons, newFilter, removePerson }) => {
    return (
        <div>
            {persons
                .filter(person => person.name.toLocaleLowerCase().includes(newFilter.toLocaleLowerCase()))
                .map(person =>
                    <div key={person.name}>
                        {person.name} {person.number}
                        <button id={person.id} name={person.name} onClick={removePerson}>
                            poista
                        </button>
                    </div>)}
        </div>
    )
}

export default Persons