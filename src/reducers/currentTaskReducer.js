import { HIDE__COMPLETED__TASKS, SET__CURRENTTASK, SHOW__COMPLETED__TASKS } from '../actions/currentTaskActions'

const currentTaskDefaultState = {
    id: 0,
    taskType: "",
    description: "",
    minutes: 1,
    subjectId: 223,
    dueDate: "2020-09-10T00:00:00",
    isDone: 0,
    title: "Completed task",
    active: 1,
    userId: 270,
    totalTime: "00:01:00",
    color: "#03a9f4",
    subjectTitle: "FSCI 200",
    showCompletedTasks: false,
}

const currentTaskReducer = (state = currentTaskDefaultState, action) => {
    switch (action.type) {
        case SET__CURRENTTASK:
            return {
                ...state,
                ...action.currentTask
            }
        case SHOW__COMPLETED__TASKS:
            return {
                ...state,
                showCompletedTasks: true
            }
        case HIDE__COMPLETED__TASKS:
            return {
                ...state,
                showCompletedTasks: false
            }
        default:
            return state
    }
}

export default currentTaskReducer