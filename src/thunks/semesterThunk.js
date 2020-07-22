import axios from 'axios'
import url from '../environment/url'
import moment from 'moment'
import { setSemesterId } from '../actions/semesterActions'
import { update } from '../actions/profileActions'

export const makeSemesterThunk = (startGpa = 0) => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    try {
        const res = await axios.post(url + '/api/Semesters/create',
            {
                userId: id,
                startGpa,
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
            console.log("semester data")
        }
    } 
    catch (e) {
        console.log(e)
        console.log(e.message)
    }
}