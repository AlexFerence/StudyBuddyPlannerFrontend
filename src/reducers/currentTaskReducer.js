import { SET__CURRENTTASK } from '../actions/currentTaskActions'

const currentTaskReducer = (state = {}, action) => {
    switch(action.type) {
        case SET__CURRENTTASK:
            return action.currentTask
        default: 
            return state
    }
}

export default currentTaskReducer