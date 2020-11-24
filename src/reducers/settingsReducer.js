import { UPDATE_SETTINGS } from '../actions/settingsActions'

const settingsDefaultState = {
    referredUsers: [],

}

const settingsReducer = (state = settingsDefaultState, action) => {
    switch (action.type) {
        case UPDATE_SETTINGS:
            return {
                ...action.payload
            }
        default:
            return state
    }
}

export default settingsReducer