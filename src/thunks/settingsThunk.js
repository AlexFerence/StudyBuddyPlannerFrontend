import axios from 'axios'
import url from '../environment/url'
import { fillSubscriptions } from '../actions/subscriptionActions'
import { updateSettings } from '../actions/settingsActions'

export const contactUsRequest = ({ description, requestType }) => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects, semester } = state
    const { id, token, email } = profile
    try {
        const res = await axios.post(url + "/api/SupportLog/create",
            {
                userEmail: email,
                userId: id,
                description,
                requestType
            },
            {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )
    } catch (e) {
        console.log(e)
    }
}

export const loadPaymentOptions = () => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects, semester } = state
    const { id, token, email } = profile
    try {
        const res = await axios.post(url + "/api/Stripe/listPrices",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )

        dispatch(fillSubscriptions(res.data))


    } catch (e) {
        console.log(e)
    }
}

export const createSubscription = () => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects, semester, subscriptions } = state
    const { id, token, email, userBilling } = profile
    const { currentSubscription } = subscriptions
    try {
        const res = await axios.post(url + "/api/UserBilling/createsubscription",
            {
                id: userBilling.id,
                userId: id,
                customer: userBilling.stripeCustomerId,
                price: currentSubscription.id
            },
            {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )

    } catch (e) {
        console.log(e)
    }
}

export const getReferredUsers = () => async (dispatch, getState) => {
    const state = getState()
    const { profile } = state
    const { id, token } = profile
    try {
        const res = await axios.post(url + "/api/campaigns/list",
            {
                userId: id,
            },
            {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )
        if (res.status === 200) {
            dispatch(updateSettings({
                referredUsers: res.data.referredUsers
            }))
        }
    } catch (e) {
        console.log(e)
    }
}

export const loadTop50 = () => async (dispatch, getState) => {
    const state = getState()
    const { profile } = state
    const { id, token } = profile
    try {
        const res = await axios.post(url + '/api/userprofiles/list',
            {
                active: true
            },
            {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )
        if (res.status === 200) {
            dispatch(updateSettings({
                top50: res.data,
                campaignCode: res.data.campaignCode
            }))
        }
    } catch (e) {
        console.log(e)
    }
}
