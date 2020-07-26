import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { signupThunk } from '../thunks/profileThunk'


import { setProfile } from '../actions/profileActions'
import axios from 'axios'
import url from '../environment/url'
import { loadSchools } from '../thunks/schoolsThunk';


const FormPage = ({ history, dispatch }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  //function to redirect to home
  const redirectToHome = () => {
    history.push("/signupSecondary")
  }

  useEffect(() => {

    dispatch(loadSchools())
    
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!email) {
      setEmailError('email is required')
    }
    else if (!password) {
      setPasswordError('password is required')
    }
    else if (password.length < 6) {
      setPasswordError('password must be at least 6 characters long')
    }
    else {

      dispatch(signupThunk({ firstName, lastName, email, password })).then((status) => {
        console.log(status)
        if (status === 200) {
          history.push("/signupSecondary")
        }
        else {
          setEmailError('email address already in use')
        }
      }).catch((e) => {
        setEmailError('email address already in use')
      })

    }
  }

  return (

    <div className="container authContainer">
    <div className="preHeader">Sign Up</div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label className="inpLabel">First Name</label>
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" className="inp" placeholder="First name" />
        </div>
        <div className="form-group">
          <label className="inpLabel">Last Name</label>
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" className="inp" placeholder="First name" />
        </div>
        <div className="form-group">
          <div className="inpLabel">Email Address { emailError && <span className="error">* {emailError}</span>}</div>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="inp" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label className="inpLabel">Password {passwordError && <span className="error">* {passwordError}</span>}</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} 
          type="password" 
          className="inp" 
          placeholder="Enter password" />
        </div>
        <button type="submit" className="btn btn-secondary btn-block preAuth">Sign Up</button>
        <p className="forgot-password text-right">
          Already registered <Link className="linkAuth" to="/login">Log In</Link>
        </p>
      </form>
    </div>
  );
}

export default connect()(FormPage)