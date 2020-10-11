import axios from 'axios'
import url from '../environment/url'
import { updatePremiumStats } from '../actions/premiumStatsActions'

export const loadDetailedView = () => async (dispatch, getState) => {
    const state = getState()
    const { profile, premiumStats } = state
    const { id, token } = profile
    const { taskTypeSelect, subjectSelect } = premiumStats
    try {
        // error
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