import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import url from '../environment/url'

const Settings = (props) => {

    const [fname, setfname] = useState(props.firstName)
    const [lname, setlname] = useState(props.lastName)
    const [email, setEmail] = useState(props.email)
    const [password, setPassword] = useState(props.password)

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(url + '/api/userprofiles/authenticate',
                {
                    Email: email,
                    Password: password
                })
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <div className="container settings">
            <form onSubmit={onSubmit}>
                <div className="inp">
                    <label>First Name</label>
                    <input 
                    type="text" 
                    name="last" 
                    value={fname}
                    onChange={(e) => setfname(e.target.value)}
                    ></input>
                </div>
                <div className="inp">
                    <label>Last Name</label>
                    <input 
                    type="text" 
                    name="last" 
                    value={lname}
                    onChange={(e) => setlname(e.target.value)}
                    ></input>
                </div>
                <div className="inp">
                    <label>Email</label>
                    <input 
                    type="email" 
                    name="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ></input>
                </div>
                <div className="inp">
                    <label>Password</label>
                    <input 
                    type="password" 
                    name="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        firstName: state.profile.firstName,
        lastName: state.profile.lastName,
        email: state.profile.email,
        password: state.profile.password,
        token: state.profile.token,
        id: state.profile.id,
    }
}

export default connect(mapStateToProps)(Settings)
