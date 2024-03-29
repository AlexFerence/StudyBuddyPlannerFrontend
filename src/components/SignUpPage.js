import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { signupThunk } from '../thunks/profileThunk'
import isEmail from 'validator/lib/isEmail';
import { loadSchools } from '../thunks/schoolsThunk';
import SignUpTopBar from './shared/SignUpTopBar'

const FormPage = ({ history, dispatch, profile }) => {

  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString);

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const { param } = useParams()

  useEffect(() => {
    dispatch(loadSchools())
    if (profile.email && profile.isAuth) {
      history.push('/dashboard')
    }
    console.log(param)
    console.log('code')
    console.log(urlParams.get('code'))
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

    setFirstName(firstName.trim())
    setLastName(lastName.trim())
    setEmail(email.trim())

    console.log(urlParams.get('code'))
    console.log(urlParams.get('code'))
    if (clean) {
      dispatch(signupThunk({
        firstName, lastName,
        email, password, code: urlParams.get('code')
      })).then((status) => {
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
    <React.Fragment>
      <SignUpTopBar />
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
            <div className="inpLabel">Email Address {emailError && <span className="error">* {emailError}</span>}</div>
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
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p className="forgot-password text-right">
              By signing up you agree <br /> to our <Link className="linkAuth" to="/privatepolicy">Private Policy</Link>
            </p>
            <p className="forgot-password text-right">
              Already registered <Link className="linkAuth" to="/login">Log In</Link>
            </p>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
}

export default connect(mapStateToProps)(FormPage)