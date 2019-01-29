import React from 'react'

const ShownCountries = ({ countries, click }) => {
    const n = countries.length
    if (n > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if ( n === 1 ){
        const country = countries[0]
        return (
            <div>
                <h1>{country.name}</h1>
                <div>capital {country.capital}</div>
                <div>population {country.population}</div>
                <h2>laguages</h2>
                <ul>
                    {country.languages.map(language => <li key={language.name}> {language.name}</li>)}
                </ul>
                <img src={country.flag} width={100}/>
            </div>
        )
    } else {
        return (
            <div>
                {countries.map(country => 
                <div key={country.name}>
                {country.name}
                <button id={country.name} onClick={click}>
                show
                </button>
                </div>)}
            </div>
        )
    }
}

export default ShownCountries