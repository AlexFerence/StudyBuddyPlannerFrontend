import { SET_ADMINSTATS } from '../actions/adminActions'

const adminStatsDefaultState = {

}

const currentTaskReducer = (state = adminStatsDefaultState, action) => {
    switch (action.type) {
        case SET_ADMINSTATS:
            return { ...action.payload }
        default:
            return state
    }
}

export default currentTaskReducer