import React from 'react'
import { Link } from 'react-router-dom'

const Overlay = ({ children }) => {
    return (
        <div className="custom-overlay">
            <div>
                <div>{children}</div>
            </div>
        </div>
    )
}

export default Overlay