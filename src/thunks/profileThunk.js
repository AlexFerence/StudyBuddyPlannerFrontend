import axios from 'axios'
import url from '../environment/url'
import moment from 'moment'
import { setProfile } from '../actions/profileActions'

export const loginThunk = ({ email, password }) => async (dispatch, getState) => {
    try {
        const res = await axios.post(url + '/api/userprofiles/authenticate',
            {
                Email: email,
                Password: password
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
                isAuth: true
            }))
        }

    } catch (e) {
        console.log(e)
        console.log(e.message)
    }
}

export const signupThunk = ({ email, password, firstName, lastName }) => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
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
                    isAuth: true
                }))
            }
            return true
        }
    } catch (e) {
        console.log(e)
        return ({ error: e })
    }
}

export const updateProfileThunk = ({ school, major, minor, faculty}) => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    try {
        const res = await axios.put(url + '/api/UserProfiles/' + id,
            {  
                ...profile,
                school,
                faculty,
                major,
                minor
            }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        console.log(res)
        dispatch(setProfile({
            ...profile,
            ...res.data
        }))

    } catch (e) {
        console.log(e)
    }
}