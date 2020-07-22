import { SET_SEMESTERID } from '../actions/semesterActions'

const semesterDefaultState = {
    semesterId: 1,
}

const semesterReducer = (state = semesterDefaultState, action) => {
    switch(action.type) {
        case SET_SEMESTERID:
            return {
                semesterId: action.semesterId
            }
        default: 
            return state
    }
}

export default semesterReducer