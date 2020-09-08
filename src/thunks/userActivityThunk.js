import axios from 'axios'
import { runningReduxOn, runningReduxOff } from '../actions/isRunningActions'
import url from '../environment/url'
import { modify } from '../actions/chartActions'
import moment from 'moment'

export const runningOnThunk = (taskId) => async (dispatch, getState) => {
    const state = getState()
    const { profile, currentTask } = state
    const { id, token } = profile
    dispatch(runningReduxOn(taskId))
    console.log('CURRENT TASK ID')
    console.log(taskId)
    try {
        const res = await axios.post(url + '/api/UserActivity/create',
            {
                userId: id,
                active: 1,
                currentTaskId: currentTask.id
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
    const { profile, subjects, currentTask } = state
    const { id, token } = profile

    dispatch(runningReduxOff(taskId))
    console.log(currentTask.id)
    try {
        var now = new Date()
        const res = await axios.post(url + '/api/UserActivity/create',
            {
                userId: id,
                active: 0,
                currentTaskId: currentTask.id,
                lastActive: moment().format(),
                //timezoneOffset: now.getTimezoneOffset() / 60
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
        const res = await axios.post(url + '/api/UserActivity/count',
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
        // large (people worldwide)
        console.log(res.data)
        dispatch(modify({
            ...res.data,
        }));

        console.log('updated user activity stopped')
    } catch (e) {
        console.log(e)
    }
}


