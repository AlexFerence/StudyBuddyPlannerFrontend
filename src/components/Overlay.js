import React from 'react'
import { Link } from 'react-router-dom'

const Overlay = () => {
    return (
        <div id="overlay">
            <div className="main"><Link className="link" to="/settings">Premium</Link> Feature</div>
        </div>
    )
}

export default Overlay