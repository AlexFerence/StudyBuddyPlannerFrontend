import { TURN_ON_LOADING, TURN_OFF_LOADING } from '../actions/loadingActions'

const loadingDefaultState = false

const loadingReducer = (state = loadingDefaultState, action) => {
    switch (action.type) {
        case TURN_ON_LOADING:
            return true
        case TURN_OFF_LOADING:
            return false
        default:
            return state
    }
}

export default loadingReducer