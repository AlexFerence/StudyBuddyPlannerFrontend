import axios from 'axios';
import url from '../environment/url';


export const loadAdminStats = () => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    console.log('setting faculties')
    try {
        const res = await axios.post(url + '/api/admincharts/listadminstats',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        console.log(res.data?.responseItems)

    } catch (e) {
        console.log(e)
    }
}
