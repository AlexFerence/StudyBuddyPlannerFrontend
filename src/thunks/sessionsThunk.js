import axios from 'axios'
import url from '../environment/url'
import moment from 'moment'

export const postSessionThunk = ({ minutes, taskId, date, title }) => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    if (!date) {
        date = moment().format("YYYY-MM-DD")
    }
    try {
        const res = await axios.post(url + '/api/subjects/list',
            {
                minutes,
                taskId,
                dateCompleted: date,
                title
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
//thunks should be working