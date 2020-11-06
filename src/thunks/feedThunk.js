import axios from 'axios';
import url from '../environment/url';
import { setFeed } from '../actions/feedActions'


export const refreshFeed = (Limit = 10) => async (dispatch, getState) => {
    const state = getState()
    const { profile } = state
    const { token, id } = profile
    console.log(id)
    try {
        const res = await axios.post(url + '/api/feeds/list',
            {
                userId: id,
                Limit
            },
            {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        if (res.status === 200) {
            console.log(res.data)
            dispatch(setFeed(res.data))
        }
    } catch (e) {
        console.log(e)
    }
}

