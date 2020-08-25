import { SET_FRIENDS } from '../actions/friendActions'

const friendsDefaultState = {
    pendingFriends: [],
    requests: [],
    activeFriends: []
}

const friendsReducer = (state = friendsDefaultState, action) => {

    switch (action.type) {
        case SET_FRIENDS:
            return {
                ...state,
                ...action.updates
            }
        default:
            return state
    }
}

export default friendsReducer