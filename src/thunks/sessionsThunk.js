import axios from 'axios'
import url from '../environment/url'
import moment from 'moment'
import TaskDisplay from '../components/TaskDisplay'
import { loadTasks, setCurrentTaskById } from './taskThunk'

export const postSessionThunk = ({ minutes, taskId, date, title }) => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    if (!date) {
        date = moment().format("YYYY-MM-DD")
    }
    try {
        const res = await axios.post(url + '/api/TaskSessions/create',
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
        dispatch(loadTasks())
    } catch (e) {
        console.log(e)
    }
}
//thunks should be working

export const getSessionsThunk = (taskId, setCurrentTask) => async (dispatch, getState) => {
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
        return res.data
        //setCurrentTask(res.data)
    } catch (e) {
        console.log(e)
    }
}

export const deleteSessionThunk = (sessionId) => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects, currentTask } = state
    const { id, token } = profile
    try {
        const res = await axios.delete(url + '/api/TaskSessions/' + sessionId,
            {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        console.log(res.data)
        dispatch(loadTasks()).then(() => {
            setCurrentTaskById(currentTask.id)
        })

        var x = await dispatch(loadTasks())
        var y = x + dispatch(setCurrentTaskById(currentTask.id))
        //setCurrentTaskById(currentTask.id)
        //setCurrentTask(res.data)
        console.log(y)
    } catch (e) {
        console.log(e)
    }
}
