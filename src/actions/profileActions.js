
export const ADD_PROFILE = 'ADD_PROFILE'
export const setProfile = (profile = { email: "", password: "" }) => ({
    type: ADD_PROFILE,
    profile,
});

export const SET_FIELDS = 'SET_FIELDS'
export const setEmail = (email) => ({
    type: SET_FIELDS,
    email
});

export const UPDATE = 'UPDATE'
export const update = (updates) => ({
    type: UPDATE,
    updates
})

export const DESTROY_SESSION = 'DESTROY_SESSION'
export const logout = () => ({
    type: DESTROY_SESSION,
})

export const MODIFY_PROFILE = 'MODIFY_PROFILE'
export const modifyProfile = (data) => ({
    type: MODIFY_PROFILE,
    data
});

export const OPEN_PAYMENT = 'OPEN_PAYMENT'
export const openPayment = () => ({
    type: OPEN_PAYMENT
});

export const CLOSE_PAYMENT = 'CLOSE_PAYMENT'
export const closePayment = () => ({
    type: CLOSE_PAYMENT,
});