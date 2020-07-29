import axios from 'axios'
import url from '../environment/url'
import { setPieChart, setSubjectBreakdownChart } from '../actions/chartActions'

export const loadChartsThunk = () => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    console.log('chart thunk')
    try {
        const res = await axios.post(url + '/api/SubjectCharts/listsubjecttotalhours',
        {
            userId: id,
        }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        
        if (res.status === 200) {
            var pieData = []
            res.data.responseItems.forEach((item) => {
                console.log(item)
                pieData.push({ 
                    value: item.value1, 
                    name: item.name1,
                })
            })
            console.log(pieData)
            dispatch(setPieChart({ pieData }))
        }
    } catch (e) {
        return(e)
    }
}

export const loadSubjectBreakdown = (subjId) => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    try {
        const res = await axios.post(url + '/api/SubjectCharts/listsubjectbreakdown',
        {
            userId: id,
            subjectId: subjId
        }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        console.log("subject breakdown")
        console.log(res.data)
        var formattedSubjectBreakdown = []
        res.data.responseItems.forEach((subj) => {
            console.log(subj)
            formattedSubjectBreakdown.push(
                { 
                value: subj.value1,
                name: subj.name1
            })
         
        })
        console.log('formatted')
        console.log(formattedSubjectBreakdown)
        dispatch(setSubjectBreakdownChart(formattedSubjectBreakdown))
    } catch (e) {
        return(e)
    }
}