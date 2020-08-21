import axios from 'axios'
import url from '../environment/url'
import { addSubject, fillSubjects } from '../actions/subjectActions'

export const cancelSubscription = () => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects, semester } = state
    const { token, userBilling } = profile
    const { stripeCustomerId,
        stripeSubscriptionId,
        stripePriceId,
        stripeCurrentPeriodEnd,
        stripeStatus, id } = userBilling

    try {
        const res = await axios.post(url + "/api/userBilling/cancelsubscription",
            {
                id,
                subscriptionId: stripeSubscriptionId
            },
            {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )
        console.log(res)

    } catch (e) {
        console.log(e)
    }
}
