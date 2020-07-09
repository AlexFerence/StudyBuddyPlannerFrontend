import { ADD_PROFILE, SET_FIELDS } from '../actions/profileActions'

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
        default: 
            return state
    }
}

export default profileReducer