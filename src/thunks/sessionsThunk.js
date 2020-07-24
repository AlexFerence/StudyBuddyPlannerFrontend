import axios from 'axios'
import url from '../environment/url'
import moment from 'moment'
import TaskDisplay from '../components/TaskDisplay'

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
        console.log('getting sessions')
        dispatch(getSessionsThunk(taskId))
    } catch (e) {
        console.log(e)
    }
}
//thunks should be working

export const getSessionsThunk = (taskId) => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    try {
        const res = await axios.get(url + '/api/Tasks/' + taskId,
            {}, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        console.log(res.data)

    } catch (e) {
        console.log(e)
    }
}