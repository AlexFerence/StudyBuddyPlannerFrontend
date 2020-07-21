import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { setProfile } from '../actions/profileActions'
import axios from 'axios'
import url from '../environment/url'


const FormPage = (props) => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //function to redirect to home
  const redirectToHome = () => {
    props.history.push("/signupSecondary")
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(url + '/api/userprofiles/create',
        { firstName,
          lastName,
          email1: email,
          password
        }) 
      if (res.status === 200) {
        const loginRes = await axios.post(url + '/api/userprofiles/authenticate',
        { 
          Email: email,
          Password: password
        })
        if (loginRes.status === 200) {
          redirectToHome()
          props.dispatch(setProfile({
            email,
            password,
            id: loginRes.data.id,
            firstName: loginRes.data.firstName,
            lastName: loginRes.data.lastName,
            token: loginRes.data.token,
            isAuth: true
        }))

          console.log(loginRes.data)
        }
      }
    } catch (e) {
      console.log(e)
    }
    //clear text
  }

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <h3>Sign Up</h3>
        <div className="form-group">
          <label>First Name</label>
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" className="form-control" placeholder="First name" />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" className="form-control" placeholder="First name" />
        </div>
        <div className="form-group">
          <label>Email Address</label>
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
          Already registered <Link to="/login">Log In</Link>
        </p>
      </form>
    </div>
  );
}

export default connect()(FormPage)