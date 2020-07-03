import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import { setProfile } from '../actions/profileActions'

const LoginPage = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const redirectToHome = () => {
        props.history.push("/dashboard")
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:52880/api/userprofiles/authenticate',
                {
                    Email: email,
                    Password: password
                })
            if (res.status === 200) {
                redirectToHome()
                console.log(res.data)
                props.dispatch(setProfile({
                    //TODO check what fields come back from res.data.email
                    email,
                    password,
                    id: res.data.id,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    token: res.data.token,
                    isAuth: true
                }))
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="container">
            <form onSubmit={onSubmit}>
                <h3>Login</h3>
                <div className="form-group">
                    <label>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control"
                        placeholder="Enter password" />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Dont have an acount? <Link to="/signup">Sign Up</Link>
                </p>
            </form>
        </div>
    )
}

export default connect()(LoginPage)