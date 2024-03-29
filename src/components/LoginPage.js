import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginThunk } from '../thunks/profileThunk'
import SignUpTopBar from './shared/SignUpTopBar'

const LoginPage = ({ dispatch, history, profile }) => {
    useEffect(() => {
        // setEmail('akaufman2000@gmail.com')
        // setPassword('securePassword')
        if (profile.email && profile.isAuth) {
            history.push('/dashboard')
        }
    }, [])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [authError, setAuthError] = useState('')

    const onSubmit = async (e) => {
        var clean = true
        if (!email) {
            setEmailError('email required')
            clean = false
        }
        else {
            setEmailError('')
        }
        if (!password) {
            setPasswordError('password required')
            clean = false
        }
        else {
            setPasswordError('')
        }
        if (clean) {
            dispatch(loginThunk({ email, password })).then((status) => {
                console.log(status)
                if (status === 200) {
                    history.push("/subjects")
                }
                else {
                    setAuthError('invalid email or password')
                }
            }).catch((e) => {

            })
        }
        e.preventDefault()
    }

    return (
        <Fragment>
            <SignUpTopBar />

            <div className="container authContainer">
                <div className="preHeader">Log In</div>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label className="inpLabel">Email {emailError && <span className="error">* {emailError}</span>}</label>
                        <input className="inp" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label className="inpLabel">Password {passwordError && <span className="error">* {passwordError}</span>}</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="inp"
                            placeholder="Enter password" />
                    </div>
                    {authError && <span className="error">* {authError}</span>}
                    <button type="submit" className="btn btn-secondary btn-block preAuth">Log In</button>
                    <div className="forgot-password"
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                        <div>
                            {<Link className="linkAuth" to="/resetpassword">Forgot password?</Link>}
                        </div>
                        <div>
                            Don't have an account? <Link className="linkAuth" to="/signup">Sign Up</Link>
                        </div>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile
    }
}

export default connect(mapStateToProps)(LoginPage)