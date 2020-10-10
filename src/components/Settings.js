import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import url from '../environment/url'
import { logout, update, modifyProfile } from '../actions/profileActions'
import { loadSchools, loadFaculties, getSchool } from '../thunks/schoolsThunk'
import Select from 'react-select'
import { contactUsRequest } from '../thunks/settingsThunk'
import swal from 'sweetalert'
import { FaEdit } from 'react-icons/fa'
import PaymentForm from './payment/PaymentModal'
import OverviewBar from './admin-components/OverviewBar'
import UniversitiesTable from './admin-components/UniversitiesTable'
import AllUsersTable from './admin-components/AdminUsersTable'
import { Redirect } from 'react-router-dom'
import AdminBar from './admin-components/AdminBar'




const style = {
    option: (base, state) => ({
        ...base,
        color: 'black',
        backgroundColor: 'white',
        borderColor: '1px solid grey'
    })
};


const Settings = ({ dispatch, firstName, lastName, emailProp, passwordProp, token,
    id, history, profile, schools, faculties, width }) => {

    const [fname, setfname] = useState(firstName)
    const [lname, setlname] = useState(lastName)
    const [email, setEmail] = useState(emailProp)
    const [password, setPassword] = useState(passwordProp)
    const [school, setSchool] = useState({})
    const [faculty, setFaculty] = useState({})
    const [description, setDescription] = useState('')
    const [requestType, setRequestType] = useState('')

    useEffect(() => {
        const defaultSchool = schools.find((school) => school.value === profile.schoolId)
        const defaultFaculty = faculties.find((faculty) => faculty.value === profile.facultyId)
        if (defaultSchool) {
            setSchool(defaultSchool)
        }
        if (defaultFaculty) {
            setFaculty(defaultFaculty)
        }
    }, [])

    const logOutCalled = () => {
        dispatch(logout())
    }

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
                    password,
                    schoolId: school.value,
                    facultyId: faculty.value
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
            swal({
                icon: 'success',
                title: 'Profile Updated'
            })
            dispatch(modifyProfile({ schoolTitle: school.label, facultytitle: faculty.label }))
        } catch (e) {
            console.log(e)
        }
    }

    const submitContactUs = () => {
        dispatch(contactUsRequest({ description, requestType: requestType.value }))
        swal({
            title: "Thank you for your feedback",
            icon: "success",
            buttons: true,
        })
        setDescription('')
        setRequestType('')

    }

    if (!profile.isAuth) {
        return (
            <Redirect to="/" />
        )
    }

    return (
        <div className="settings" style={(width < 1000) ? {
            paddingRight: '0px'
        } : {
                border:
                    '0px solid blue',
                paddingRight: '300px'
            }}>

            <div className="settings-title" style={{ paddingTop: "30px" }}>Settings</div>
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
                <label className="inpLabel"
                    style={{ marginBottom: '5px' }}
                >School</label>
                <Select
                    value={school}
                    onChange={val => setSchool(val)}
                    placeholder="School..."
                    options={schools}
                    theme={(theme) => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            text: 'black',
                            primary25: '#bcbcbc',
                            primary50: '#bcbcbc',
                            primary: '#bcbcbc',
                        },
                    })}
                />
                <div style={{ height: '5px' }} />
                <label className="inpLabel"
                    style={{ marginBottom: '5px' }}
                >Faculty</label>
                <Select
                    value={faculty}
                    onChange={val => setFaculty(val)}
                    placeholder="School..."
                    options={faculties}
                    theme={(theme) => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            text: 'black',
                            primary25: '#bcbcbc',
                            primary50: '#bcbcbc',
                            primary: '#bcbcbc',
                        },
                    })}
                />

                <div style={{ height: '10px' }} />
                <button style={{ marginLeft: '0px' }} className="but">Update Profile</button>
            </form>

            <div className="section contact-us">

                <div className="settings-title" style={{ paddingTop: "30px", paddingBottom: "20px" }}>Contact Us</div>
                <Select
                    isClearable={true}
                    onSelectResetsInput={false}
                    placeholder="Type of error"
                    className="selectedInp"
                    options={[
                        { value: 'NewFeature', label: 'New Feature' },
                        { value: 'Bug', label: 'Bug' },
                    ]}
                    values={[]}
                    onChange={(value) => setRequestType(value)}
                    styles={style}
                />
                <textarea onChange={(e) => setDescription(e.target.value)}>

                </textarea>
                <button className="but" style={{ marginLeft: '0px' }} onClick={submitContactUs}>Submit</button>
            </div>
            <button id="butFull" className="but" onClick={logOutCalled}
                style={{ marginBottom: "30px" }}
            >Log Out</button>
            {
                (emailProp === 'akaufman2000@gmail.com' || emailProp === 'alexference23@gmail.com' ||
                    emailProp === 'vladstets18@gmail.com' || email === 'Vladstets18@gmail.com' || emailProp === 'maddy.eppsconn@gmail.com') &&
                <div>
                    <OverviewBar />
                    <AdminBar />
                    <UniversitiesTable />
                    <div style={{ height: '30px' }}></div>
                    <AllUsersTable />
                </div>
            }


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
        profile: state.profile,
        width: state.width
    }
}

export default connect(mapStateToProps)(Settings)