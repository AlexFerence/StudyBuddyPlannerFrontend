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
                pieColors.push(item.name2)
                //get him to send subjectId along with name 2
            })
            //console.log(pieData)
            dispatch(setPieChart({ pieData }))
            dispatch(modify({ pieColors }))
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
            //console.log(subj)
            formattedSubjectBreakdown.push(
                { 
                value: subj.value1,
                name: subj.name1
            })
         
        })
        //console.log('formatted')
       //console.log(formattedSubjectBreakdown)
        dispatch(setSubjectBreakdownChart(formattedSubjectBreakdown))
    } catch (e) {
        return(e)
    }
}

export const loadHoursWeek = (date = moment()) => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    //console.log("date")
    //console.log(id)
    try {
        const res = await axios.post(url + "/api/TaskCharts/listhoursperweek",
        {
            userId: id,
            date: date.format("YYYY-MM-DD")
        }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
       // console.log("hours week")
        //console.log(res.data)
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
        //console.log("year breakdown")
        //console.log(res.data)
        var formattedYearBreakdown = []
        var xAxis = []

        res.data.responseItems.forEach((subj) => {
            //console.log(subj)
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
        //console.log("year breakdown")
        //console.log(res.data)
        var formattedYearBreakdown = []
        var xAxis = []

        res.data.responseItems.forEach((subj) => {
            //console.log(subj)
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
            //console.log(subj)
            formattedMarksScatter.push(
                [ subj.value2, subj.value1 ])
        })
        dispatch(setGpaScatter(formattedMarksScatter))
    } catch(e) {
        console.log(e)
    }
}

export const loadTaskHoursPerWeek = () => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    try {
        const res = await axios.post(url + "/api/TaskCharts/listhourspermonth",
        {
            userId: id,
        }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        var formattedWeekData = []
        console.log(res.data)
        var hoursPerWeekColors = []

        res.data.forEach((subj) => {
            var title = subj.title
            var individlList = []
            //hoursPerWeekColors.push(subj.color)
            subj.responseItems.forEach((item) => {
                individlList.push(item.value1)
            })
            formattedWeekData.push({
                name: title,
                type: 'line',
                color: subj.color,
                data: individlList
            })

        })
        console.log('hours per week asdfasdfasdfasdfasdf;laskdjf;lkasj')
        console.log(formattedWeekData)
        var hoursPerWeekSubjBeakdown = formattedWeekData
        dispatch(modify({ hoursPerWeekSubjBeakdown }))
        dispatch(modify({ hoursPerWeekColors }))
    } catch(e) {
        console.log(e)
    }
}

export const loadPersonalStats = () => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    try {
        const res = await axios.post(url + "/api/TaskCharts/listpersonalstats",
        {
            userId: id,
            date: String(moment().format("YYYY-MM-DD"))
        }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        var formattedPersonalStats = []

        console.log(res.data)

        res.data.responseItems.forEach((item) => {
            formattedPersonalStats.push({ mins: item.value2, hours: item.value1 })
        })
        
        console.log('formatted personal stats')

        dispatch(modify({ todayTotal: {mins: res.data.responseItems[0].value2, hours: res.data.responseItems[0].value1 }, thisWeekTotal: {mins: res.data.responseItems[3].value2, hours: res.data.responseItems[3].value1 }, thisMonthTotal: {mins: res.data.responseItems[6].value2, hours: res.data.responseItems[6].value1 }}));
        dispatch(modify({ dailyAverage: res.data.responseItems[1], weeklyAverage: res.data.responseItems[4], monthlyAverage: res.data.responseItems[7]}));
        dispatch(modify({ bestDay: res.data.responseItems[2], bestWeek: res.data.responseItems[5], bestMonth: res.data.responseItems[8]}));


        //dispatch(modify({ formattedPersonalStats }))

    } catch(e) {
        console.log(e)
    }
}

export const loadAverageOfWeekDay = () => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    try {
        const res = await axios.post(url + "/api/TaskCharts/listaveragehoursperweek",
        {
            userId: id,
            date: moment().format("YYYY-MM-DD")
        }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        var averageByDayOfWeek = []
        var averageByDayOfWeekxaxis = []

        res.data.responseItems.forEach((item) => {
            averageByDayOfWeek.push(item.value1)
            averageByDayOfWeekxaxis.push(item.name1)
        })
        dispatch(modify({ averageByDayOfWeek, averageByDayOfWeekxaxis }))

    } catch(e) {
        console.log(e)
    }
}