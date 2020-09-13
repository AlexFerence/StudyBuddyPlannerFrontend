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

        console.log(res.data)
    } catch (e) {
        return (e)
    }
}