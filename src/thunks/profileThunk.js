import axios from 'axios'
import url from '../environment/url'
import { setProfile, update, modifyProfile } from '../actions/profileActions'
import { refreshAllCharts } from './chartThunk'
import { realoadClassesThunk } from './subjectThunk'
import { loadTasks } from './taskThunk'

export const loginThunk = ({ email, password }) => async (dispatch, getState) => {
    try {
        const res = await axios.post(url + '/api/userprofiles/authenticate',
            {
                email,
                password
            })
        if (res.status === 200) {
            console.log(res.data)
            dispatch(setProfile({
                //TODO check what fields come back from res.data.email
                email,
                password,
                id: res.data.id,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                token: res.data.token,
                isAuth: true,
            }))
            dispatch(refreshUser());
            dispatch(refreshAllCharts());
            dispatch(loadTasks())
            dispatch(realoadClassesThunk)
        }
        return (res.status)
    } catch (e) {
        return (e)
        console.log(e)
        console.log(e.message)
    }
}

export const signupThunk = ({ email, password, firstName, lastName }) => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile

    // console.log(password)
    //console.log(password)
    try {
        const signUpres = await axios.post(url + '/api/userprofiles/create',
            {
                firstName,
                lastName,
                email,
                password
            })
        if (signUpres.status === 200) {
            const res = await axios.post(url + '/api/userprofiles/authenticate',
                {
                    email,
                    password
                })
            if (res.status === 200) {
                dispatch(setProfile({
                    email,
                    password,
                    id: res.data.id,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    token: res.data.token,
                    isAuth: false
                }))
            }
            return res.status
        }
    } catch (e) {
        console.log(e)
        return ({ error: e })
    }
}

export const updateProfileThunk = ({ school, major, minor, faculty, year = 0 }) => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    try {
        const res = await axios.put(url + '/api/UserProfiles/' + id,
            {
                ...profile,
                schoolID: school,
                facultyID: faculty,
                major,
                minor,
                year
            }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        console.log('put update recieved data')

        console.log(res.data)
        dispatch(update({
            ...res.data
        }))
        return res.data

    } catch (e) {
        console.log(e)
    }
}

export const refreshUser = () => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    try {
        const res = await axios.get(url + '/api/userprofiles/' + id,
            {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })

        console.log(res.data)

        dispatch(modifyProfile({
            ...res.data
        }))

    } catch (e) {
        console.log(e)
    }
}

export const turnOffTaskTour = () => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    try {
        const res = await axios.put(url + '/api/UserProfiles/' + id, {
            ...profile,
            taskTour: 1
        },
            {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })

        console.log(res.data)

        dispatch(modifyProfile({
            ...res.data
        }))
    } catch (e) {
        console.log(e)
    }
}

export const turnOffSubjectTour = () => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    try {
        const res = await axios.put(url + '/api/UserProfiles/' + id, {
            ...profile,
            subjectTour: 1
        },
            {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })

        console.log(res.data)

        dispatch(modifyProfile({
            ...res.data
        }))
    } catch (e) {
        console.log(e)
    }
}

export const turnOffDashboardTour = () => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    try {
        const res = await axios.put(url + '/api/UserProfiles/' + id, {
            ...profile,
            dashboardTour: 1
        },
            {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })

        console.log(res.data)

        dispatch(modifyProfile({
            ...res.data
        }))
    } catch (e) {
        console.log(e)
    }
}