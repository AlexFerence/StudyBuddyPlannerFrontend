import { SET_FACULTIES } from '../actions/facultyActions'

const facultiesDefaultState = {
    faculties: [],
}

const facultiesReducer = (state = facultiesDefaultState, action) => {
    switch(action.type) {
        case SET_FACULTIES:
            return action.faculties
        default: 
            return state
    }
}

export default facultiesReducer