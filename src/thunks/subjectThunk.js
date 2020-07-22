
import axios from 'axios'
import url from '../environment/url'
import { addSubject, fillSubjects } from '../actions/subjectActions'

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
                    'Authorization': 'bearer ' + token,
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

export const editSubjectThunk = (newData, classSelection) => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects, semester } = state
    const { id, token } = profile
    const { semesterId } = semester
    try {
        const res = await axios.put(url + '/api/subjects/' + classSelection.id,
            {
                ...newData,
                semesterId
            },
            {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )
        console.log(res.data)

        if (res.status === 200) {
            dispatch(realoadClassesThunk())
        }


    } catch (e) {
        console.log(e)
    }
}


export const realoadClassesThunk = () => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects, semester } = state
    const { id, token } = profile
    try {
        const res = await axios.post(url + '/api/subjects/list',
            {
                UserId: id
            }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const list = res.data
        dispatch(fillSubjects(list))
    }
    catch (e) {
        console.log('caught errors')
        console.log(e)
    }
}