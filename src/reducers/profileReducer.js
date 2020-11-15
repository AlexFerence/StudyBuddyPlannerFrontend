import { ADD_PROFILE, SET_FIELDS, UPDATE, MODIFY_PROFILE, OPEN_PAYMENT, CLOSE_PAYMENT } from '../actions/profileActions'

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
    },
    semesters: [],
    paymentOpen: false
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
            if (action.semesters === null) {
                return {
                    ...state,
                    ...action.updated,
                    semesters: state.s
                }
            }
            else {
                return {
                    ...state,
                    ...action.updates
                }

            }


        case MODIFY_PROFILE:
            if (action.data.semesters === null) {
                return {
                    ...state,
                    ...action.data,
                    semesters: state.semesters
                }
            }
            return {
                ...state,
                ...action.data
            }
        case OPEN_PAYMENT:
            return {
                ...state,
                paymentOpen: true
            }
        case CLOSE_PAYMENT:
            return {
                ...state,
                paymentOpen: false
            }
        default:
            return state
    }
}

export default profileReducer