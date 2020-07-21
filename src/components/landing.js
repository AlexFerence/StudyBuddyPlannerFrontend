import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <div>
            hello
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Log In</Link>
        </div>
    )
}

export default Landing