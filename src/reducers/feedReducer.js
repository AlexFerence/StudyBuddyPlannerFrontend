import { SET_FEED } from '../actions/feedActions'

const feedDefaultState = []

const friendsReducer = (state = feedDefaultState, action) => {
    switch (action.type) {
        case SET_FEED:
            const valid = Array.isArray(action.payload)
            if (!valid) {
                console.error('Setting feed as something thats not an array')
                return []
            }
            return action.payload
        default:
            return state
    }
}

export default friendsReducer