import { ADD_PROFILE, SET_FIELDS, UPDATE, MODIFY_PROFILE } from '../actions/profileActions'

const profileReducerDefaultState = {
    email: '',
    password: '',
    token: '',
    firstName: '',
    lastName: '',
    id: 0,
    isAuth: false,
    tokenExpiry: '',
    userBilling: {
        stripeStatus: "",
        id: 0,
        userId: 0,
        stripeCurrentPeriodEnd: "",
        stripeCustomerId: "cus_HtJ1BMgUoXQBiU",
        stripeSubscriptionId: ""
    }

}


const profileReducer = (state = profileReducerDefaultState, action) => {
    switch (action.type) {
        case ADD_PROFILE:
            return action.profile

        case SET_FIELDS:
            return {
                ...state,
                email: action.email
            }
        case UPDATE:
            return {
                ...state,
                ...action.updates

            }
        case MODIFY_PROFILE:
            return {
                ...state,
                ...action.data
            }
        default:
            return state
    }
}

export default profileReducer