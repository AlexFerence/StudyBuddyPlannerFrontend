import { SET_SELECTED_SEMESTER } from '../actions/selectedSemesterActions'

const selectedSemesterDefaultState = {
    id: 0,
    title: ''

}

const schoolsReducer = (state = selectedSemesterDefaultState, action) => {
    switch (action.type) {
        case SET_SELECTED_SEMESTER:
            return action.payload
        default:
            return state
    }
}

export default schoolsReducer