import { FILL_SUBSCRIPTIONS, SET_CURRENT_SUBSCRIPTION } from '../actions/subscriptionActions'

const subscriptionReducer = (state = {}, action) => {
    switch (action.type) {
        case FILL_SUBSCRIPTIONS:
            return {
                ...state,
                subscriptions: action.subscriptions
            }
        case SET_CURRENT_SUBSCRIPTION:
            return {
                ...state,
                currentSubscription: action.subscription
            }

        default:
            return state
    }
}

export default subscriptionReducer