import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import { setProfile } from '../actions/profileActions'
import url from '../environment/url'

const LoginPage = (props) => {

    useEffect(() => {
        setEmail('akaufman2000@gmail.com')
        setPassword('securePassword')
    }, [])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const redirectToHome = () => {
        props.history.push("/dashboard")
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        redirectToHome()
    }
    
    return (
      
        
        <div className="container authContainer">
            <div className="preHeader">Log In</div>
            <form onSubmit={onSubmit}> 
                <div className="form-group">
                    <label className="inpLabel">Email</label>
                    <input className="inp" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label className="inpLabel">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="inp"
                        placeholder="Enter password" />
                </div>
                <button type="submit" className="btn btn-secondary btn-block preAuth">Log In</button>
                <p className="forgot-password text-right">
                    Don't have an acount? <Link className="linkAuth" to="/signup">Sign Up</Link>
                </p>
            </form>
        </div>

    )
}

export default connect()(LoginPage)