import axios from 'axios'
import url from '../environment/url'
import moment from 'moment'
import TaskDisplay from '../components/TaskDisplay'
import { setSchools } from '../actions/schoolActions'
import { setFaculties } from '../actions/facultyActions'

export const loadSchools = () => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    try {
        const res = await axios.post(url + '/api/Schools/list',
            {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        var formattedSchools = []
        
        res.data.forEach((school) => {
            formattedSchools.push({ id: school.id, label: school.name })
            //console.log(school)
        })

        dispatch(setSchools(formattedSchools))
        console.log(typeof(formattedSchools))
        //return formattedSchools
        
       
    } catch (e) {
        console.log(e)
    }
}

export const loadFaculties = () => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    console.log('setting faculties')
    try {
        const res = await axios.post(url + '/api/Faculties/list',
            {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        console.log(res)

        var formattedFaculties = []
        
        console.log(res.data)
        
        res.data.forEach((faculty) => {
            formattedFaculties.push({ id: faculty.id, label: faculty.name })
            //console.log(school)
        })

        console.log(formattedFaculties)
        dispatch(setFaculties(formattedFaculties)) 
       
    } catch (e) {
        console.log(e)
    }
}
