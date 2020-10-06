import axios from 'axios'
import url from '../environment/url'
import { setSemesterId } from '../actions/semesterActions'
import { refreshUser } from './profileThunk'


export const makeSemesterThunk = (startGpa = 0, startPercentage = 0) => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    try {
        const res = await axios.post(url + '/api/Semesters/create',
            {
                userId: id,
                startGpa,
                startPercentage,
                active: 1,
                startDate: "2020-08-31",
                endDate: "2020-12-31"
            }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        if (res.status === 200) {
            dispatch(setSemesterId(res.data.id))
        }
    }
    catch (e) {
        console.log(e)
        console.log(e.message)
    }
}

export const getSemester = (startGpa = 0, startPercentage = 0) => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    const activeSemesterId = 1
    try {
        const res = await axios.get(url + '/api/Semesters/' + activeSemesterId,
            {
                userId: id,
                startGpa,
                startPercentage,
                active: 1,
                startDate: "2020-08-31",
                endDate: "2020-12-31"
            }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        if (res.status === 200) {
            dispatch(setSemesterId(res.data.id))

        }
    }
    catch (e) {
        console.log(e)
        console.log(e.message)
    }
}

export const createSemesterThunk = ({ title, startDate, endDate }) => async (dispatch, getState) => {
    const state = getState()
    const { profile } = state
    const { id, token } = profile
    try {
        const res = await axios.post(url + '/api/Semesters/create',
            {
                userId: id,
                startGpa: 1,
                startPercentage: 1,
                active: 0,
                startDate,
                endDate,
                title
            }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        if (res.status === 200) {
            await dispatch(refreshUser())
        }
    }
    catch (e) {
        console.log(e)
        console.log(e.message)
    }
}