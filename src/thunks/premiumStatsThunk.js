import axios from 'axios'
import url from '../environment/url'
import { updatePremiumStats } from '../actions/premiumStatsActions'

export const loadDetailedView = () => async (dispatch, getState) => {
    const state = getState()
    const { profile } = state
    const { id, token } = profile
    try {
        // error
        const res = await axios.post(url + '/api/PersonalCharts/listdetailedview',
            {
                userId: id,
                taskType: 'assignment'
            }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        if (res.status === 200 && res.data.length > 0) {
            dispatch(updatePremiumStats({
                selectedTask: res.data[0],
                completedTasks: res.data
            }))
        }
    } catch (e) {
        return (e)
    }
}