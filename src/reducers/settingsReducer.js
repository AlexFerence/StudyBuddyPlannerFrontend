import { UPDATE_SETTINGS } from '../actions/settingsActions'

const settingsDefaultState = {
    referredUsers: [],
    top50: [],
    campaignCode: ''
}

const settingsReducer = (state = settingsDefaultState, action) => {
    switch (action.type) {
        case UPDATE_SETTINGS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default settingsReducer