import axios from 'axios'
import url from '../environment/url'
import { fillTasks } from '../actions/taskActions'

export const loadTasks = () => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    try {
        const res = await axios.post(url + '/api/tasks/list',
            {
                UserId: id
            }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        if (res.status === 200) {
            dispatch(fillTasks(res.data))
        }

    } catch (e) {
        console.log(e)
    }
}



export const getTask = (taskId) => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    try {
        const res = await axios.get(url + '/api/Tasks/' + taskId,
        {
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