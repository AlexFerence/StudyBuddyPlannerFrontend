import axios from 'axios'
import url from '../environment/url'
import moment from 'moment'
import TaskDisplay from '../components/TaskDisplay'
import { setSchools } from '../actions/schoolActions'

export const loadSchools = () => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    try {
        const res = await axios.post(url + '/api/Schools/list',
            {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        dispatch(setSchools(res.data))
        console.log(res.data)
        return res.data
       
    } catch (e) {
        console.log(e)
    }
}