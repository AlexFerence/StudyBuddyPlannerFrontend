import { SET_PIE_CHART, SET_SUBJECT_BREAKDOWN_CHART } from '../actions/chartActions'

const chartsReducer = (state = {}, action) => {
    switch(action.type) {
        case SET_PIE_CHART:
            return {
                ...state,
                pieChart: action.pieChart
            }
        case SET_SUBJECT_BREAKDOWN_CHART:
            console.log('breakdown')
            return {
                ...state,
                breakdownChart: action.breakdownChart
            }

        default: 
            return state
    }
}

export default chartsReducer