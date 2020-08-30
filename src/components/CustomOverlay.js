import React from 'react'
import { Link } from 'react-router-dom'

const Overlay = ({ message }) => {
    return (
        <div className="custom-overlay">
            <div>
                <div>{message}</div>
            </div>
        </div>
    )
}

export default Overlay