import axios from 'axios'
import url from '../environment/url'
import {
    setPieChart, setSubjectBreakdownChart,
    setHoursWeek, setYearBreakdown,
    setYearXAxis,
    setFacultyBreakdown,
    setFacultyXAxis,
    setGpaScatter,
    modify
} from '../actions/chartActions'

import moment from 'moment'

export const loadChartsThunk = () => async (dispatch, getState) => {
    const state = getState()
    const { profile } = state
    const { id, token } = profile
    try {
        // error
        const res = await axios.post(url + '/api/PersonalCharts/listsubjecttotalhours',
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
            })
            //console.log(pieData)
            dispatch(setPieChart({ pieData }))
            dispatch(modify({ pieColors }))
        }
    } catch (e) {
        return (e)
    }
}

export const loadSubjectBreakdown = (subjId) => async (dispatch, getState) => {
    const state = getState()
    const { profile } = state
    const { id, token } = profile
    try {
        const res = await axios.post(url + '/api/PersonalCharts/listsubjectbreakdown',
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

        var formattedSubjectBreakdown = []
        res.data.responseItems.forEach((subj) => {

            formattedSubjectBreakdown.push(
                {
                    value: subj.value1,
                    name: subj.name1
                })

        })

        dispatch(setSubjectBreakdownChart(formattedSubjectBreakdown))
    } catch (e) {
        return (e)
    }
}

export const loadHoursWeek = (date = moment()) => async (dispatch, getState) => {
    const state = getState()
    const { profile } = state
    const { id, token } = profile

    try {
        const res = await axios.post(url + "/api/personalcharts/listhoursperweek",
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

        var weekList = []
        res.data.responseItems.forEach((item) => {
            weekList.push(item.value1)
        })

        dispatch(setHoursWeek(weekList))
    } catch (e) {
        console.log(e)
    }
}

export const loadYearBeakdown = () => async (dispatch, getState) => {
    const state = getState()
    const { profile } = state
    const { token } = profile
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

        var formattedYearBreakdown = []
        var xAxis = []

        res.data.responseItems.forEach((subj) => {
            formattedYearBreakdown.push(
                {
                    value: subj.value1,
                    name: subj.name1
                })
            xAxis.push(subj.name1)
        })
        dispatch(setYearBreakdown(formattedYearBreakdown))
        dispatch(setYearXAxis(xAxis))

    } catch (e) {
        console.log(e)
    }
}

export const loadFacultyStats = () => async (dispatch, getState) => {
    const state = getState()
    const { profile } = state
    const { token } = profile
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

    } catch (e) {
        console.log(e)
    }
}

export const loadMarksScatter = () => async (dispatch, getState) => {
    const state = getState()
    const { profile } = state
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
                [subj.value2, subj.value1])
        })
        dispatch(setGpaScatter(formattedMarksScatter))
    } catch (e) {
        console.log(e)
    }
}

export const loadTaskHoursPerWeek = () => async (dispatch, getState) => {
    const state = getState()
    const { profile } = state
    const { id, token } = profile
    try {
        const res = await axios.post(url + "/api/PersonalCharts/listhourspermonth",
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


        var hoursPerWeekColors = []
        var hoursPerWeekSubjBeakdownXAxis = []
        var firstTime = true

        res.data.forEach((subj) => {
            var title = subj.title
            var individlList = []

            //hoursPerWeekColors.push(subj.color)
            subj.responseItems.forEach((item) => {
                individlList.push(item.value1)
                if (firstTime) {

                    hoursPerWeekSubjBeakdownXAxis.push(moment(item.name1).format("MMM D"))
                }
            })

            firstTime = false

            formattedWeekData.push({
                name: title,
                type: 'line',
                color: subj.color,
                data: individlList
            })
        })
        var hoursPerWeekSubjBeakdown = formattedWeekData
        dispatch(modify({ hoursPerWeekSubjBeakdown }))
        dispatch(modify({ hoursPerWeekColors }))
        dispatch(modify({ hoursPerWeekSubjBeakdownXAxis }))
    } catch (e) {
        console.log(e)
    }
}

export const loadPersonalStats = () => async (dispatch, getState) => {
    const state = getState()
    const { profile } = state
    const { id, token } = profile
    try {
        const res = await axios.post(url + "/api/PersonalCharts/listpersonalstats",
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
        if (res.status === 200) {

            dispatch(modify({ personalStats: { ...res.data } }))



        }



        // dispatch(modify({ todayTotal: { mins: res.data.responseItems[0].value2, hours: res.data.responseItems[0].value1 }, thisWeekTotal: { mins: res.data.responseItems[3].value2, hours: res.data.responseItems[3].value1 }, thisMonthTotal: { mins: res.data.responseItems[6].value2, hours: res.data.responseItems[6].value1 } }));
        // dispatch(modify({ dailyAverage: { mins: res.data.responseItems[1].value2, hours: res.data.responseItems[1].value1 }, weeklyAverage: { mins: res.data.responseItems[4].value2, hours: res.data.responseItems[4].value1 }, monthlyAverage: { mins: res.data.responseItems[7].value2, hours: res.data.responseItems[7].value1 } }));
        // dispatch(modify({ bestDay: { mins: res.data.responseItems[2].value2, hours: res.data.responseItems[2].value1 }, bestWeek: { mins: res.data.responseItems[5].value2, hours: res.data.responseItems[5].value1 }, bestMonth: { mins: res.data.responseItems[8].value2, hours: res.data.responseItems[8].value1 } }));


        // dispatch(modify({ formattedPersonalStats }))

    } catch (e) {
        console.log(e)
    }
}

export const loadAverageOfWeekDay = () => async (dispatch, getState) => {
    const state = getState()
    const { profile } = state
    const { id, token } = profile
    try {
        const res = await axios.post(url + "/api/PersonalCharts/listaveragehoursperweek",
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

    } catch (e) {
        console.log(e)
    }
}

export const loadUACurrentUsers = () => async (dispatch, getState) => {
    const state = getState()
    const { profile } = state
    const { id, token } = profile
    try {
        const res = await axios.post(url + "/api/UserActivity/count",
            {
                userId: id,
                //school id??
                school: profile.schoolId
            }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        dispatch(modify({ personalStats: { ...res.data } }))

    } catch (e) {
        console.log(e)
    }
}

export const comparativePersonalToAverage = (sid) => async (dispatch, getState) => {
    const state = getState()
    const { profile, } = state
    const { id, token, subjId, schoolId } = profile
    try {
        const res = await axios.post(url + "/api/ComparativeCharts/listhourspermonthcomparative",
            {
                userId: id,
                subjectId: sid,
                schoolId,
            }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        var formattedWeekData = []
        var comparativePersonalToAverageColors = []

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

        var comparativePersonalToAverageData = formattedWeekData
        dispatch(modify({ comparativePersonalToAverageData }))
        dispatch(modify({ comparativePersonalToAverageColors }))
    } catch (e) {
        console.log(e)
    }
}

const defaultUserBilling = { stripeStatus: 0 }

export const loadFiveCharts = () => async (dispatch, getState) => {
    console.log('loading 5 subjects')
    // top right
    dispatch(loadHoursWeek())

    // subject week breakdown
    dispatch(loadTaskHoursPerWeek())

    // personal stats
    dispatch(loadPersonalStats())

    // average per day of week
    dispatch(loadAverageOfWeekDay())

    // subject pie chart
    dispatch(loadChartsThunk())
}

