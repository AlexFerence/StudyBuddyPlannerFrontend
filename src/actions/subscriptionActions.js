

export const FILL_SUBSCRIPTIONS = 'FILL_SUBSCRIPTIONS'
export const fillSubscriptions = (subscriptions) => ({
    type: FILL_SUBSCRIPTIONS,
    subscriptions
})

export const SET_CURRENT_SUBSCRIPTION = 'SET_CURRENT_SUBSCRIPTION'
export const setCurrentSubscription = (subscription) => ({
    type: SET_CURRENT_SUBSCRIPTION,
    subscription
})