import {
    SET_PIE_CHART,
    SET_SUBJECT_BREAKDOWN_CHART,
    SET_HOURS_WEEK, SET_YEAR_BREAKDOWN,
    SET_YEAR_XAXIS,
    SET_FACULTY_BREAKDOWN,
    SET_FACULTY_XAXIS,
    SET_GPA_SCATTER,
    MODIFY
} from '../actions/chartActions'

const chartsReducer = (state = {}, action) => {
    switch (action.type) {
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
        case SET_HOURS_WEEK:
            console.log('hours per week set')
            return {
                ...state,
                hoursWeekData: action.hoursWeekData
            }
        case SET_YEAR_BREAKDOWN:
            return {
                ...state,
                yearData: action.yearData
            }
        case SET_YEAR_XAXIS:
            return {
                ...state,
                yearXAxis: action.xAxis
            }
        case SET_FACULTY_BREAKDOWN:
            return {
                ...state,
                facultyData: action.yearData
            }
        case SET_FACULTY_XAXIS:
            return {
                ...state,
                facultyXAxis: action.xAxis
            }
        case SET_GPA_SCATTER:
            return {
                ...state,
                scatterData: action.gpaScatterData
            }
        case MODIFY:
            return {
                ...state,
                ...action.data
        }
        
        default:
            return state
    }
}

export default chartsReducer