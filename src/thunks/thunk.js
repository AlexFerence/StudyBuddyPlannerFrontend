

// export const loadSubjects = () => async (dispatch, getState) => {
//     try {
//         const state = getState

//         const res = await axios.post(url + '/api/subjects/list',
//             {
//                 UserId: state.profile.id
//             }, {
//             headers: {
//                 'Authorization': 'bearer ' + state.profile.token,
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             }
//         })
//         const list = res.data
//         props.dispatch(fillSubjects(list))

//     } catch (e) {
//         console.log(e)
//     }
// }

