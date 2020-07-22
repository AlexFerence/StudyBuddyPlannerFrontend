import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { signupThunk } from '../thunks/profileThunk'


import { setProfile } from '../actions/profileActions'
import axios from 'axios'
import url from '../environment/url'


const FormPage = ({ history, dispatch }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  //function to redirect to home
  const redirectToHome = () => {
    history.push("/signupSecondary")
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const auth = dispatch(signupThunk({ firstName, lastName, email, password }))
    if (!auth.error) {
      redirectToHome()
      
    }
    else {
      setError(auth)
    }
    

  }

  return (
    <div className="container">
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
          <label className="inpLabel">Email Address</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="inp" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label className="inpLabel">Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} 
          type="password" 
          className="inp" 
          placeholder="Enter password" />
        </div>
        <button type="submit" className="btn btn-secondary btn-block">Sign Up</button>
        <p className="forgot-password text-right">
          Already registered <Link to="/login">Log In</Link>
        </p>
      </form>
    </div>
  );
}

export default connect()(FormPage)