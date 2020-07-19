import axios from 'axios'
import { runningReduxOn, runningReduxOff } from '../actions/isRunningActions'
import url from '../environment/url'

export const runningOnThunk = (taskId) => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    dispatch(runningReduxOn(taskId))

    console.log('running on thunk')
    try {
        const res = await axios.post(url + '/api/subjects/list',
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
        const res = await axios.post(url + '/api/subjects/list',
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
        console.log('updated done')
    } catch (e) {
        console.log(e)
    }
}