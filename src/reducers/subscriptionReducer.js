import { FILL_SUBSCRIPTIONS, SET_CURRENT_SUBSCRIPTION, SET_ACTIVE_SUBSCRIPTION } from '../actions/subscriptionActions'

const subscriptionDefaultState = {
    subscriptions: [],
    currentSubscription: {
        id: "",
        interval: "",
        amount: "",
    },
    activeSub: {
        id: "",
        interval: "",
        amount: "",
    }
};

const subscriptionReducer = (state = subscriptionDefaultState, action) => {
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
        case SET_ACTIVE_SUBSCRIPTION:
            return {
                ...state,
                activeSub: action.activeSub
            }

        default:
            return state
    }
}

export default subscriptionReducer