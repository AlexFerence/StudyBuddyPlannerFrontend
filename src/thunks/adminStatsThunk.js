import axios from 'axios';
import url from '../environment/url';

export const loadAdminStats = () => async (dispatch, getState) => {
    const state = getState()
    const { profile } = state
    const { id, token } = profile
    try {
        const res = await axios.post(url + '/api/admincharts/listadminstats',
            {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        //console.log(res.data)
        return res.data

    } catch (e) {
        return (e)
    }
}

export const loadSupportLog = () => async (dispatch, getState) => {
    const state = getState()
    const { profile } = state
    const { id, token } = profile
    try {
        const res = await axios.post(url + '/api/supportlog/list',
            {},
            {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        return res.data

    } catch (e) {
        console.error(e)
        return (e)
    }
}

export const loadAllUsers = () => async (dispatch, getState) => {
    const state = getState()
    const { profile } = state
    const { id, token } = profile
    try {
        const res = await axios.post(url + '/api/admincharts/listusers',
            {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        if (res.status === 200) {
            return res?.data
        }
        else return []

    } catch (e) {
        return (e)
    }
}

export const loadNewUsers = () => async (dispatch, getState) => {
    const state = getState()
    const { profile } = state
    const { id, token } = profile
    try {
        const res = await axios.post(url + '/api/admincharts/listnewusers',
            {},
            {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        if (res.status === 200) {
            return res.data.responseItems
        }
        else {
            console.error('error getting new users')
            return []
        }

    } catch (e) {
        console.error(e)
        return (e)
    }
}