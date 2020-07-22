import semesterReducer from "../reducers/semesterReducer"

export const addSubjectThunk = ({ subTitle, classCode, description, professor, credits, color }) => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects, semester } = state
    const { id, token } = profile
    const { semesterId } = semester
    try {
        const res = await axios.post(url + '/api/subjects/create',
            {
                "Name": subTitle.toUpperCase().trim(),
                "ClassCode": classCode,
                "Description": description.trim(),
                "Professor": professor.trim(),
                "Credits": credits,
                "UserId": id,
                "color": color.hex,
                "semesterId": semesterId 
            },
            {
                headers: {
                    'Authorization': 'bearer ' + props.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )
        if (res.status === 200) {
            dispatch(addSubject(res.data))

            
        }
    
    } catch (e) {
        console.log(e)
    }
}

