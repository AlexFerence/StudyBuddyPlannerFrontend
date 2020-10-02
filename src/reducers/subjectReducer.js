import { DELETE_SUBJECT, ADD_SUBJECT, FILL_SUBJECTS } from '../actions/subjectActions'

const subjectDefaultState = []

const subjectReducer = (state = subjectDefaultState, action) => {
    switch (action.type) {
        case ADD_SUBJECT:
            return [...state, action.newSubject]
        case DELETE_SUBJECT:
            return state.filter((subject) => subject.id !== action.id)
        case FILL_SUBJECTS:
            return action.subjects
        default:
            return state
    }
}

export default subjectReducer