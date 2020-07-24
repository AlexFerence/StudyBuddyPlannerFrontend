import { RUNNING_OFF, RUNNING_ON, PAUSED_ON, PAUSED_OFF, SET_COUNT } from '../actions/isRunningActions'

const isRunningDefaultState = {
    isRunning: false,
    paused: false,
    countRedux: 0,
    taskId: 0,
    classId: 0
}

const profileReducer = (state = isRunningDefaultState, action) => {
    switch(action.type) {
        case RUNNING_OFF:
            //CAN I SAVE HEre
            return {
                ...state,
                isRunning: false,
                taskId: 0
            }

        case RUNNING_ON:
            return {
                ...state,
                isRunning: true,
                taskId: action.taskId,
            }
        case PAUSED_ON:
            return {
                ...state,
                paused: true
            }
        case PAUSED_OFF:
            return {
                ...state,
                paused: false
            }
        case SET_COUNT:
            return {
                ...state,
                count: action.count
            }
        default:
            return state
    }
}

export default profileReducer