import axios from 'axios'
import url from '../environment/url'
import moment from 'moment'
import { setProfile } from '../actions/profileActions'

export const makeSemester = () => async (dispatch, getState) => {
    try {
        const res = await axios.post(url + '/api/Semesters/create',
            {
                
            })
        if (res.status === 200) {
            
        }

    } catch (e) {
        console.log(e)
        console.log(e.message)
    }
}