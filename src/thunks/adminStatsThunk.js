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
            return res?.data?.responseItems
        }
        else return []

    } catch (e) {
        return (e)
    }
}