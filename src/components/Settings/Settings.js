import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import url from '../../environment/url'
import { logout, update, modifyProfile } from '../../actions/profileActions'
import Select from 'react-select'
import { contactUsRequest } from '../../thunks/settingsThunk'
import swal from 'sweetalert'
import OverviewBar from '../admin-components/OverviewBar'
import UniversitiesTable from '../admin-components/UniversitiesTable'
import AllUsersTable from '../admin-components/AdminUsersTable'
import AdminFacultiesPie from '../admin-components/AdminFacultiesPie'
import SupportLog from '../admin-components/SupportLog'
import AdminBar from '../admin-components/AdminBar'
import PaymentModal from '../payment/PaymentModal'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { refreshUser } from '../../thunks/profileThunk'
import NewUsersCal from '../admin-components/NewUsersCal'
import ListReferredUsers from './ListReferredUsers'
import ProgressBarReferral from '../ProgressBarReferral'


const style = {
    option: (base, state) => ({
        ...base,
        color: 'black',
        backgroundColor: 'white',
        borderColor: '1px solid grey'
    })
};


const Settings = ({ dispatch, firstName, lastName, emailProp, passwordProp, token,
    id, history, profile, schools, faculties, width, top50, campaignCode }) => {

    const [pub, setPub] = useState(profile.feedPrivacy ? 'true' : 'false')

    const [fname, setfname] = useState(firstName)
    const [lname, setlname] = useState(lastName)
    const [email, setEmail] = useState(emailProp)
    const [password, setPassword] = useState(passwordProp)
    const [school, setSchool] = useState({})
    const [faculty, setFaculty] = useState({})
    const [description, setDescription] = useState('')
    const [requestType, setRequestType] = useState('')

    const [uniTableOpen, setUniTableOpen] = useState(false)
    const [usersTableOpen, setUsersTableOpen] = useState(false)
    const [supportLogOpen, setSupportLogOpen] = useState(false)
    const [newUsersCal, setNewUsersCalOpen] = useState(false)

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
        window.location.href = 'https://www.studybuddyplanner.com/';
        dispatch(logout())
        return null;
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        if (!school.value || !faculty.value) {
            alert('Error updating profile, please update profile')
            return
        }

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
                    facultyId: faculty.value,
                    feedPrivacy: pub === 'true' ? 1 : 0
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
            dispatch(refreshUser())
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
        window.location.href = 'https://www.studybuddyplanner.com/';
        return null;
    }

    const inTop50 = top50.find((user) => user.email === emailProp)

    return (
        <div className="settings" style={(width < 1000) ? {
            paddingRight: '0px'
        } : {
                border:
                    '0px solid blue',
                paddingRight: '300px'
            }}>
            {
                false && <PaymentModal />
            }
            {
                inTop50 &&
                <Fragment>
                    <div className="settings-title" style={{ paddingTop: "30px" }}>My Referrals</div>
                    <div style={{ height: '5px' }} />
                    <ProgressBarReferral />
                    <div style={{ height: '5px' }} />
                    <ListReferredUsers />
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        color: 'grey',
                        marginBottom: '5px'
                    }}>
                        Your promo link:
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '30px'
                    }}>
                        {url + '/signup?code=' + campaignCode}
                    </div>
                </Fragment>
            }
            <div className="settings-title">
                Settings
            </div>
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
                <label className="inpLabel"
                    style={{ marginBottom: '5px' }}
                >Feed Privacy:</label>
                <FormControl component="fieldset">
                    <RadioGroup row className="top-five__title-container__radio-container"
                        onChange={(e) => {
                            setPub(e.target.value)
                            console.log(e.target.value)
                        }}
                        value={pub}
                    >
                        <FormControlLabel style={{ marginRight: '0px', width: '100px' }} value='true' control={<Radio color="default" size="small" />} label="Private" />
                        <FormControlLabel style={{ marginRight: '0px', width: '100px' }} value='false' control={<Radio color="default" size="small" />} label="Public" />
                    </RadioGroup>
                </FormControl>

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
                (emailProp === 'alexference23@gmail.com'
                    || emailProp === 'akaufman2000@gmail.com'
                ) &&
                <div>
                    <OverviewBar />
                    {false && <AdminBar />}
                    <AdminFacultiesPie />
                    <button onClick={() => setUniTableOpen(true)}>Open Universities Table</button>
                    {uniTableOpen &&
                        <UniversitiesTable />
                    }
                    <div style={{ height: '30px' }}></div>
                    <button onClick={() => setUsersTableOpen(true)}>Open Users Table</button>
                    {usersTableOpen &&
                        <AllUsersTable />
                    }
                    <div style={{ height: '30px' }}></div>
                    <button onClick={() => setSupportLogOpen(true)}>Open Support Log</button>
                    {supportLogOpen && <SupportLog />}
                    <div style={{ height: '30px' }}></div>
                    <button onClick={() => setNewUsersCalOpen(true)}>Open New Users Heatmap</button>
                    {newUsersCal && <NewUsersCal />}
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
        width: state.width,
        top50: state.settings.top50,
        campaignCode: state.settings.campaignCode
    }
}

export default connect(mapStateToProps)(Settings)