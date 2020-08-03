import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import url from '../environment/url'
import { logout } from '../actions/profileActions'
import { loadSchools, loadFaculties } from '../thunks/schoolsThunk'

const Settings = ({ dispatch, firstName, lastName, emailProp, passwordProp, token, 
    id, history, profile }) => {
    const [fname, setfname] = useState(firstName)
    const [lname, setlname] = useState(lastName)
    const [email, setEmail] = useState(emailProp)
    const [password, setPassword] = useState(passwordProp)

    const logOutCalled = () => {
        dispatch(logout())
        history.push("/login")
    }

    useEffect(() => {
        dispatch(loadSchools())
        dispatch(loadFaculties())

    }, [])

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log(token)
            const res = await axios.put(url + '/api/userprofiles/' + id,
                {
                    ...profile,
                    firstName: fname,
                    lastName: lname,
                    email1: email,
                    Password: password,
                }, {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'

                }
            }
            )
            console.log(res.status)
            console.log(res.data)
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <div className="container settings">
            <form onSubmit={onSubmit}>

                <label className="inpLabel">First Name</label>
                <input
                    className="inp"
                    type="text"
                    name="last"
                    value={fname}
                    onChange={(e) => setfname(e.target.value)}
                ></input>


                <label className="inpLabel">Last Name</label>
                <input
                    className="inp"
                    type="text"
                    name="last"
                    value={lname}
                    onChange={(e) => setlname(e.target.value)}
                ></input>
                <label className="inpLabel">Email</label>
                <input
                    className="inp"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>

                <label className="inpLabel">Password</label>
                <input
                    className="inp"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>

                <button>Submit</button>
            </form>
            <button onClick={logOutCalled}>Log Out</button>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        firstName: state.profile.firstName,
        lastName: state.profile.lastName,
        emailProp: state.profile.email,
        passwordProp: state.profile.password,
        token: state.profile.token,
        id: state.profile.id,
        schools: state.schools,
        faculties: state.faculties,
        profile: state.profile
    }
}

export default connect(mapStateToProps)(Settings)
