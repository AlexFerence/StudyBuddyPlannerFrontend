import { UPDATE__PREMIUMSTATS } from '../actions/premiumStatsActions'

const premiumStatsReducerDefaultState = {
    selectedTask: {},
    completedTasks: [],
}

const facultiesReducer = (state = premiumStatsReducerDefaultState, action) => {
    switch (action.type) {
        case UPDATE__PREMIUMSTATS:
            return {
                ...state,
                ...action.updates
            }
        default:
            return state
    }
}

export default facultiesReducer