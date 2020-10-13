import axios from 'axios'
import url from '../environment/url'
import { updatePremiumStats } from '../actions/premiumStatsActions'

export const loadDetailedView = () => async (dispatch, getState) => {
    const state = getState()
    const { profile, premiumStats } = state
    const { id, token } = profile
    const { taskTypeSelect, subjectSelect } = premiumStats
    try {
        const res = await axios.post(url + '/api/PersonalCharts/listdetailedview',
            {
                userId: id,
                taskType: taskTypeSelect.value,
                subjectId: subjectSelect.value.id
            }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        if (res.status === 200) {
            dispatch(updatePremiumStats({
                completedTasks: res.data
            }))
        }
    } catch (e) {
        return (e)
    }
}


export const loadTop5Assignments = () => async (dispatch, getState) => {
    const state = getState()
    const { profile, premiumStats } = state
    const { id, token } = profile
    const { taskTypeSelect, subjectSelect } = premiumStats
    try {
        // error
        const res = await axios.post(url + '/api/ComparativeCharts/listbestassignments',
            {
                userId: id,
                personal: true
            }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        if (res.status === 200) {
            dispatch(updatePremiumStats({
                top5Assignments: res.data
            }))
        }
    } catch (e) {
        return (e)
    }
}

export const loadTop5AssignmentsFriends = () => async (dispatch, getState) => {
    const state = getState()
    const { profile, premiumStats } = state
    const { id, token } = profile
    const { taskTypeSelect, subjectSelect } = premiumStats
    try {
        const res = await axios.post(url + '/api/ComparativeCharts/listbestassignments',
            {
                userId: id,
                personal: false
            }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        if (res.status === 200) {
            dispatch(updatePremiumStats({
                top5AssignmentsFriends: res.data
            }))
        }
    } catch (e) {
        return (e)
    }
}

export const loadTop5Days = () => async (dispatch, getState) => {
    const state = getState()
    const { profile, premiumStats } = state
    const { id, token } = profile
    const { taskTypeSelect, subjectSelect } = premiumStats
    try {
        // error
        const res = await axios.post(url + '/api/ComparativeCharts/listbestdays',
            {
                userId: id,
                personal: true
            }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        if (res.status === 200) {
            dispatch(updatePremiumStats({
                top5Days: res.data
            }))
        }
    } catch (e) {
        return (e)
    }
}

export const loadTop5DaysFriends = () => async (dispatch, getState) => {
    const state = getState()
    const { profile, premiumStats } = state
    const { id, token } = profile
    const { taskTypeSelect, subjectSelect } = premiumStats


    try {
        // error
        const res = await axios.post(url + '/api/ComparativeCharts/listbestdays',
            {
                userId: id,
                personal: false
            }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        if (res.status === 200) {
            dispatch(updatePremiumStats({
                top5DaysFriends: res.data
            }))
        }
    } catch (e) {
        return (e)
    }
}