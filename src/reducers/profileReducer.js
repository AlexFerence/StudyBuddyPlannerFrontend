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
        case 'ADD_PROFILE':
            console.log('save user!!!!!!')
            return action.profile

        case 'SET_FIELDS':
            return {
                ...state,
                email: action.email
            }
        default: 
            return state
    }
}

export default profileReducer