

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

export const SET_ACTIVE_SUBSCRIPTION = 'SET_ACTIVE_SUBSCRIPTION'
export const setActiveSubscription = (activeSub) => ({
    type: SET_ACTIVE_SUBSCRIPTION,
    activeSub
})