import axios from 'axios'
import { runningReduxOn, runningReduxOff } from '../actions/isRunningActions'
import url from '../environment/url'
import { modify } from '../actions/chartActions'

export const runningOnThunk = (taskId) => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    dispatch(runningReduxOn(taskId))
    console.log('running on thunk')
    try {
        const res = await axios.post(url + '/api/UserActivity/create',
            {
                userId: id,
                active: 1
            }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        console.log('user activity updated')
    } catch (e) {
        console.log(e)
    }
}

export const runningOffThunk = (taskId) => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    dispatch(runningReduxOff(taskId))
    try {
        const res = await axios.post(url + '/api/UserActivity/create',
            {
                userId: id,
                active: 0
            }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        console.log('updated user activity stopped')
    } catch (e) {
        console.log(e)
    }
}

export const userActivityCount = () => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    console.log(' CURRENT USERS ')
    try {
        // smallest (school and faculty)
        const res0 = await axios.post(url + '/api/UserActivity/count',
            {
                faculty: profile.facultyId,
                school: profile.schoolId

            }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        // medium (people at your school)
        const res1 = await axios.post(url + '/api/UserActivity/count',
            {
                school: profile.schoolId
            }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        // large (people worldwide)
        const res2 = await axios.post(url + '/api/UserActivity/count',
            {

            }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        console.log(res0.data)
        console.log(res1.data)
        console.log(res2.data)

        dispatch(modify({
            schoolFacultyCurUsers: res0.data,
            schoolCurUsers: res1.data,
            worldCurUsers: res2.data
        }));

        console.log('updated user activity stopped')
    } catch (e) {
        console.log(e)
    }
}


