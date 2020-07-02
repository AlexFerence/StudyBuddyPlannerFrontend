
export const setProfile = (profile = { email: "", password: "", token: "" }) => ({
    type: 'ADD_PROFILE',
    profile,
});

export const setEmail = (email) => ({
    type: 'SET_FIELDS',
    email
})

