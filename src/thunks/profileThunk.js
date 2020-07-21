import axios from 'axios'
import url from '../environment/url'
import moment from 'moment'
import { setProfile } from '../actions/profileActions'

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
        dispatch(setProfile(res.data))

    } catch (e) {
        console.log(e)
    }
}