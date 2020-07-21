
export const ADD_PROFILE = 'ADD_PROFILE'
export const setProfile = (profile = { email: "", password: "", token: "" }) => ({
    type: ADD_PROFILE,
    profile,
});

export const SET_FIELDS = 'SET_FIELDS'
export const setEmail = (email) => ({
    type: SET_FIELDS,
    email
})

