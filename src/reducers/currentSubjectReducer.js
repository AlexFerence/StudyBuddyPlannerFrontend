import { SET_CURRENT_SUBJECT } from '../actions/currentSubjectActions'

const currentSubjectDefaultState = {
    currentSubject: {}
}

const currentSubjectReducer = (state = currentSubjectDefaultState, action) => {
    switch (action.type) {
        case SET_CURRENT_SUBJECT:
            return action.payload
        default:
            return state
    }
}

export default currentSubjectReducer