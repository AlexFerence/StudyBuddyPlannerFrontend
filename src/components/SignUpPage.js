import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { signupThunk } from '../thunks/profileThunk'
import isEmail from 'validator/lib/isEmail';

import { setProfile } from '../actions/profileActions'
import axios from 'axios'
import url from '../environment/url'
import { loadSchools } from '../thunks/schoolsThunk';


const FormPage = ({ history, dispatch, profile }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  useEffect(() => {
    dispatch(loadSchools())
    if (profile.email) {
      history.push('dashboard')
  }
  }, [])

  const onSubmit = async (e) => {
    var clean = true;
    e.preventDefault()
    if (!email) {
      setEmailError('email is required')
      clean = false
    }
    else if (!isEmail(email)) {
      setEmailError('not a valid email')
      clean = false
    }
    else {
      setEmailError('')
    }
    if (!password) {
      setPasswordError('password is required')
      clean = false
    }
    else if (password.length < 6) {
      setPasswordError('password must be at least 6 characters long')
      clean = false
    }
    else {
      setPasswordError('')
    }
    if (clean) {
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
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="inp" placeholder="Enter email" />
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

const mapStateToProps = (state) => {
  return {
      profile: state.profile
  }
}

export default connect(mapStateToProps)(FormPage)