import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import url from '../environment/url'
import { logout, update } from '../actions/profileActions'
import { loadSchools, loadFaculties, getSchool } from '../thunks/schoolsThunk'
import Select from 'react-select'

const style = {
    option: (base, state) => ({
      ...base,
      color: 'black',
      backgroundColor: 'white',
      borderColor: '1px solid grey'
    })
};


const Settings = ({ dispatch, firstName, lastName, emailProp, passwordProp, token,
    id, history, profile, schools, faculties }) => {

    const [fname, setfname] = useState(firstName)
    const [lname, setlname] = useState(lastName)
    const [email, setEmail] = useState(emailProp)
    const [password, setPassword] = useState(passwordProp)
    const [school, setSchool] = useState({})
    const [faculty, setFaculty] = useState({})

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
                    email: email,
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
            dispatch(update({
                ...profile,
                ...res.data
            }))    
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

                <label className="inpLabel">School</label>
      <Select
        isClearable={true}
        onSelectResetsInput={false}
        placeholder="school ..."
        className="selectedInp"
        options={schools}
        values={[]}
        onChange={(value) => setSchool(value)}
        components={{ DropdownIndicator: () => null }}
        styles={style} 
        
      />
      <label className="inpLabel">Faculty </label>
      <Select
      isClearable={true}
        placeholder="faculty ..."
        className="selectedInp"
        options={faculties}
        values={[]}
        onChange={(value) => setFaculty(value)}
        components={{ DropdownIndicator: () => null }}
        styles={style} 
        />
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
