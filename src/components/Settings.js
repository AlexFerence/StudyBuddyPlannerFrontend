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
    const [description, setDescription] = useState('')
    const [requestType, setRequestType] = useState('')
    const [isEditingSchool, setIsEditingSchool] = useState(false);
    const [isEditingFaculty, setIsEditingFaculty] = useState(false);


    //    const [contactType, setContactType] = useState('')

    const logOutCalled = () => {
        dispatch(logout())
        history.push("/")
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
                    schoolId: school.id,
                    faculty: faculty.id
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


    return (
        <div className="container settings">
            <div style={{ width: '100%', height: '300px' }}>
                <PaymentForm />
            </div>
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

                <button style={{ marginLeft: '0px' }} className="but">Submit</button>
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
