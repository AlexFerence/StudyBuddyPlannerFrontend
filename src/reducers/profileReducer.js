import { ADD_PROFILE, SET_FIELDS, UPDATE, MODIFY_PROFILE } from '../actions/profileActions'

const profileReducerDefaultState = {
    email: '',
    password: '',
    token: '',
    firstName: '',
    lastName: '',
    id: 0,
    isAuth: false
}


const profileReducer = (state = profileReducerDefaultState, action) => {
    switch(action.type) {
        case ADD_PROFILE:
            console.log('save user!!!!!!')
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