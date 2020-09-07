import axios from 'axios'
import url from '../environment/url'
import { fillTasks } from '../actions/taskActions'
import { setCurrentTask } from '../actions/currentTaskActions'

export const loadTasks = (filterBy = true, completed = true) => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    console.log("filter by " + filterBy)
    console.log("completed " + completed)
    try {
        const res = await axios.post(url + '/api/tasks/list',
            {
                isDone: (completed ? 0 : 1),
                filterBySubject: !filterBy,
                filterByDueDate: filterBy,
                userId: id
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

export const updateTask = (updatedTask) => async (dispatch, getState) => {
    const { profile, subjects, currentTask } = getState()
    const { id, token } = profile
    try {
        console.log('updating task')
        //console.log(updatedTask.id)
        delete updatedTask.color
        delete updatedTask.subjectTitle

        const res = await axios.put(url + '/api/Tasks/' + updatedTask.id, {
            ...updatedTask
        }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const wait = await dispatch(loadTasks())
        // if (wait) {
        //     await dispatch(setCurrentTaskById(res.data.id))
        // }

    } catch (e) {
        console.log(e)
    }
}

export const setCurrentTaskById = (taskId) => async (dispatch, getState) => {
    const { profile, subjects, currentTask, tasks } = getState()
    const { id, token } = profile

    const getClassName = (subjectId) => {
        const subj = subjects.find((subject) => subject.id === subjectId)
        if (subj) {
            return (subj.name + " " + subj.classCode)
        }
        else {
            return ("no class found")
        }
    }

    const getClassColor = (subjectId) => {
        const subj = subjects.find((subject) => subject.id === subjectId)

        if (subj) {
            return (subj.color)
        }
        else {
            return (undefined)
        }
    }

    const task = tasks.find((t) => t.id === taskId)
    console.log('about to set currentTask')
    //console.log(taskId)


    if (task) {
        dispatch(setCurrentTask({
            ...task,
            color: getClassColor(task.subjectId),
            subjectTitle: getClassName(task.subjectId)
        }))
        console.log({
            ...task,
            color: getClassColor(task.subjectId),
            subjectTitle: getClassName(task.subjectId)
        })
    }
}

export const markTaskAsDone = (taskId) => async (dispatch, getState) => {
    const { profile, subjects, currentTask, tasks } = getState()
    const { id, token } = profile
    try {
        const res = await axios.put(url + '/api/Tasks/' + taskId, {
            ...currentTask,
            isDone: 1
        }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        console.log(res.data)
        dispatch(loadTasks())
        dispatch(setCurrentTask({}))
    } catch (e) {
    }
}

export const unmarkTaskAsDone = (taskId) => async (dispatch, getState) => {
    const { profile, subjects, currentTask, tasks } = getState()
    const { id, token } = profile
    console.log('unmarking task')
    console.log('unmarking task')
    console.log('unmarking task')
    console.log('unmarking task')
    try {
        const res = await axios.put(url + '/api/Tasks/' + taskId, {
            ...currentTask,
            isDone: 0
        }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        dispatch(loadTasks())
        dispatch(setCurrentTaskById(currentTask.id))
    } catch (e) {
    }
}
