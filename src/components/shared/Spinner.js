import React from 'react'

const Spinner = ({ dark }) => {
    return (
        <div
            style={dark ? { color: 'grey' } : {}}
            className="loader"></div>
    )
}

export default Spinner