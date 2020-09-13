import { SET_SCHOOLS } from '../actions/schoolActions'

const schoolsDefaultState = []

const schoolsReducer = (state = schoolsDefaultState, action) => {
    switch (action.type) {
        case SET_SCHOOLS:
            return action.schools
        default:
            return state
    }
}

export default schoolsReducer