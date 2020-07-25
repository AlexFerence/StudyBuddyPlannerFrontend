import { SET_SCHOOLS } from '../actions/schoolActions'

const schoolsDefaultState = {
    schools: [],
}

const schoolsReducer = (state = schoolsDefaultState, action) => {
    switch(action.type) {
        case SET_SCHOOLS:
            return action.schools
        default: 
            return state
    }
}

export default schoolsReducer