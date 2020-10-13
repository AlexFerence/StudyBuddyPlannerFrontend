import { UPDATE__PREMIUMSTATS, SET_SELECTED_SUBJECT, SET_SELECTED_TASK_TYPE } from '../actions/premiumStatsActions'

const premiumStatsReducerDefaultState = {
    selectedTask: {},
    completedTasks: [],
    taskTypeSelect: { value: '', label: 'All' },
    subjectSelect: { value: '', label: 'All' },
    top5Assignments: [],
    top5AssignmentsFriends: [],
    top5Days: [],
    top5DaysFriends: [],

}

const facultiesReducer = (state = premiumStatsReducerDefaultState, action) => {
    switch (action.type) {
        case UPDATE__PREMIUMSTATS:
            return {
                ...state,
                ...action.updates
            }
        case SET_SELECTED_SUBJECT:
            return {
                ...state,
                subjectSelect: action.payload
            }
        case SET_SELECTED_TASK_TYPE:
            return {
                ...state,
                taskTypeSelect: action.payload
            }
        default:
            return state
    }
}

export default facultiesReducer