import axios from 'axios'
import url from '../environment/url'
import { setPieChart, setSubjectBreakdownChart, 
    setHoursWeek, setYearBreakdown,
    setYearXAxis,
    setFacultyBreakdown,
    setFacultyXAxis,
    setGpaScatter,
    modify
} from '../actions/chartActions'
import { getClassColor } from './subjectThunk'
import moment from 'moment'

export const loadChartsThunk = () => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    try {
        // error
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
            var pieColors = []
            res.data.responseItems.forEach((item) => {
                //console.log(item)
                pieData.push({ 
                    value: item.value1, 
                    name: item.name1,
                })
                //get him to send subjectId along with name 2
            })
            //console.log(pieData)
            dispatch(setPieChart({ pieData }))
            //dispatch(modify({ pieColors }))
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
        //console.log("subject breakdown")
        //console.log(res.data)
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

export const loadHoursWeek = (date = moment().format("YYYY-MM-DD")) => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    console.log("date")
    console.log(id)
    try {
        const res = await axios.post(url + "/api/TaskCharts/listhoursperweek",
        {
            userId: id,
            date: "2020-07-29"
        }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        console.log("hours week")
        console.log(res.data)
        var weekList = []
        res.data.responseItems.forEach((item) => {
            weekList.push(item.value1)
        })
        
        dispatch(setHoursWeek(weekList))
    } catch(e) {
        console.log(e)
    }
}

export const loadYearBeakdown = () => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    try {
        const res = await axios.post(url + "/api/ComparativeCharts/populationbreakdown",
        {
            "breakdownType": 1,
            "calculateAverage": true
        }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        console.log("year breakdown")
        console.log(res.data)
        var formattedYearBreakdown = []
        var xAxis = []

        res.data.responseItems.forEach((subj) => {
            console.log(subj)
            formattedYearBreakdown.push(
                { 
                value: subj.value1,
                name: subj.name1
            })
            xAxis.push(subj.name1)
        })
        dispatch(setYearBreakdown(formattedYearBreakdown))
        dispatch(setYearXAxis(xAxis))
    
    } catch(e) {
        console.log(e)
    }
}

export const loadFacultyStats = () => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    try {
        const res = await axios.post(url + "/api/ComparativeCharts/populationbreakdown",
        {
            "breakdownType": 0,
            "calculateAverage": true
        }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        console.log("year breakdown")
        console.log(res.data)
        var formattedYearBreakdown = []
        var xAxis = []

        res.data.responseItems.forEach((subj) => {
            console.log(subj)
            formattedYearBreakdown.push(
                { 
                value: subj.value1,
                name: subj.name1
            })
            xAxis.push(subj.name1)
        })
        dispatch(setFacultyBreakdown(formattedYearBreakdown))
        dispatch(setFacultyXAxis(xAxis))
    
    } catch(e) {
        console.log(e)
    }
}

export const loadMarksScatter = () => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    try {
        const res = await axios.post(url + "/api/ComparativeCharts/markshoursscatter",
        {
            userId: id,
        }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        var formattedMarksScatter = []

        res.data.responseItems.forEach((subj) => {
            console.log(subj)
            formattedMarksScatter.push(
                [ subj.value2, subj.value1 ])
        })
        dispatch(setGpaScatter(formattedMarksScatter))
    } catch(e) {
        console.log(e)
    }
}