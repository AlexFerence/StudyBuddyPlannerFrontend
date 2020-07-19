import { RUNNING_OFF, RUNNING_ON } from '../actions/isRunningActions'

const isRunningDefaultState = {
    isRunning: false,
    taskId: 0,
    classId: 0
}

const profileReducer = (state = isRunningDefaultState, action) => {
    switch(action.type) {
        case RUNNING_OFF:
            //CAN I SAVE HEre
            return {
                isRunning: false,
                taskId: 0
            }

        case RUNNING_ON:
            return {
                ...state,
                isRunning: true,
                taskId: action.taskId,
            }
        default: 
            return state
    }
}

export default profileReducer