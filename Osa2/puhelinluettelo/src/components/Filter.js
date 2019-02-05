import React from 'react'

const Filter = ({ newFilter, handleFilterChange }) => {
    return (
        <div>
            rajaa näytettäviä ihmisiä
            <input value={newFilter}
                onChange={handleFilterChange} />
        </div>
    )
}

export default Filter