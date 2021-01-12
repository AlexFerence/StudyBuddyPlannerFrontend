
import axios from 'axios'
import url from '../environment/url'
import { addSubject, fillSubjects } from '../actions/subjectActions'
import { setSubjToAdd } from '../actions/signupThirdActions'
import { loadTasks } from './taskThunk'
import { addTaskThunk } from './taskThunk'
import moment from 'moment'

export const addSubjectThunk = ({ semesterId, subTitle, classCode, description, professor = '', credits = 3,
    color = { hex: "#2B2B2B" } }) => async (dispatch, getState) => {
        const state = getState()
        const { profile } = state
        const { id, token, semesters } = profile

        const activeSemester = semesters?.find((sem) => sem.active === 1)

        console.log('adding subject')
        console.log(classCode)
        console.log(description)
        console.log(subTitle)

        try {
            const res = await axios.post(url + "/api/Subjects/create",
                {
                    Name: subTitle.toUpperCase().trim(),
                    ClassCode: classCode,
                    Description: description.trim(),
                    Professor: professor.trim() || '',
                    Credits: credits,
                    UserId: id,
                    color: color.hex || "#656565",
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
            console.log('add subj res')
            console.log(res)
            if (res.status === 200) {
                await dispatch(addSubject(res.data))
                await dispatch(realoadClassesThunk())

                await dispatch(addTaskThunk({
                    taskType: 'General Studying',
                    title: 'General Studying',
                    dueDate: moment().add(1, 'months').format("YYYY-MM-DD"),
                    description: '',
                    subjectId: res.data.id
                }))
                console.log('SUBJ ID')
                console.log(res.data.id)
            }
        } catch (e) {
            console.log(e)
        }
    }

export const editSubjectThunk = (newData, classSelection) => async (dispatch, getState) => {
    const state = getState()
    const { profile } = state
    const { id, token, semesters } = profile


    const activeSemester = semesters.find((sem) => sem.active === 1)

    try {
        const res = await axios.put(url + '/api/subjects/' + classSelection.id,
            {
                ...newData,
                semesterId: activeSemester.id
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
        console.log('SUBJECTS')
        console.log(list)
        dispatch(fillSubjects(list))
    }
    catch (e) {
        console.log(e)
    }
}


export const getClassColor = (subjId) => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects, semester } = state
    const { id, token } = profile

    const subj = subjects.find((subject) => subject.id === subjId)
    if (subj) {
        return (subj.color)
    }
    else {
        return (undefined)
    }
}

export const getClassName = (subjId) => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects, semester } = state
    const { id, token } = profile

    const subj = subjects.find((subject) => subject.id === subjId)
    if (subj) {
        return (subj.name)
    }
    else {
        return (undefined)
    }
}

export const submitFirstClasses = (subjId) => async (dispatch, getState) => {
    const state = getState()
    const { signupThird } = state
    let subjWasAdded = false
    signupThird.forEach(async (subjToAdd, index) => {
        if (subjToAdd.subTitle || subjToAdd.classCode || subjToAdd.description) {
            subjWasAdded = true
            await dispatch(addSubjectThunk(subjToAdd))
            dispatch(setSubjToAdd(
                {
                    subTitle: '',
                    classCode: '',
                    description: ''
                }, index)
            )

        }
    })
    await dispatch(realoadClassesThunk())
    await dispatch(loadTasks())
    return (subjWasAdded)
}
