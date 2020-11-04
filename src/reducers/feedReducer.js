import { SET_FEED, SET_LASTSEEN } from '../actions/feedActions'

const feedDefaultState = {
    list: [],
    lastSeen: {},
    numHaventSeen: 0,
}

const friendsReducer = (state = feedDefaultState, action) => {
    switch (action.type) {
        case SET_FEED:
            const valid = Array.isArray(action.payload)
            if (!valid) {
                console.error('Setting feed as something thats not an array')
                return []
            }
            return {
                ...state,
                list: action.payload
            }
        case SET_LASTSEEN:
            if (state.list && state.list.length > 0) {
                return {
                    ...state,
                    lastSeen: state.list[0]
                }
            }
        default:
            return state
    }
}

export default friendsReducer