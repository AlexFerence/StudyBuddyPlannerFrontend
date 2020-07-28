import { SET_ALL_CHARTS } from '../actions/chartActions'

const chartsReducer = (state = {}, action) => {
    switch(action.type) {
        case SET_ALL_CHARTS:
            return action.tasks
        default: 
            return state
    }
}

export default chartsReducer