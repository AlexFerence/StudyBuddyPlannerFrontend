import axios from 'axios';
import { runningReduxOn, runningReduxOff } from '../actions/isRunningActions';
import url from '../environment/url';
import { modify } from '../actions/chartActions';

export const searchIfExists = (email) => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    if (email.length === 0) {
        return undefined
    }
    try {
        const res = await axios.get(url + '/api/userprofiles/' + email + '/true',
            {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        return res.data

    } catch (e) {
        console.log(e)
    }
}

export const sendRequest = (otherID) => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    try {
        const res = await axios.post(url + '/api/Friends/sendRequest', {
            userId1: id,
            userId2: otherID,
        },
            {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )
        return (res.data);

    } catch (e) {
        console.log(e)
    }
}