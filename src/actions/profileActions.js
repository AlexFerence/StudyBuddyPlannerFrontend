
export const ADD_PROFILE = 'ADD_PROFILE'
export const setProfile = (profile = { email: "", password: ""}) => ({
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