import axios from 'axios'
import url from '../environment/url'
import { setCharts } from '../actions/chartActions'

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
        console.log(res.data)
        console.log(res.status)
        if (res.status === 200) {
            var pieData = []
            res.data.responseItems.forEach((item) => {
                console.log(item)
                pieData.push({ 
                    value: parseInt(item.name2.replace(",", "")), 
                    name: item.name1,
                    color: "#333333"
                })
            })
            dispatch(setCharts({ pieData }))
        }
    } catch (e) {
        return(e)
    }
}

export const loadSubjectBreakdown = () => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    try {
        const res = await axios.post(url + '/api/SubjectCharts/listsubjectbreakdown',
        {
            userId: id,
            subjectId: 100
        }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        console.log("subject breakdown")
        console.log(res.data)

        // if (res.status === 200) {
        //     var pieData = []
        //     res.data.responseItems.forEach((item) => {
        //         console.log(item)
        //         pieData.push({ 
        //             value: parseInt(item.name2.replace(",", "")), 
        //             name: item.name1,
        //             color: "#333333"
        //         })
        //     })
        //     dispatch(setCharts({ pieData }))
        //}
    } catch (e) {
        return(e)
    }
}