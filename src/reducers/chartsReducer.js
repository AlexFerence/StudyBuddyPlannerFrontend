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

const chartsDefaultState = {
    breakdownChart: [],
    hoursWeekData: [],
    bestDay: { mins: 0, hours: 0 },
    bestWeek: { mins: 0, hours: 0 },
    bestMonth: { mins: 0, hours: 0 },
    hoursPerWeekSubjBreakdownXAxis: [],
    hoursPerWeekColors: [],
    hoursPerWeekSubjBreakdown: [],
    pieChart: {
        pieData: []
    },
    streak: 0,
    pieColors: [],
    personalStats: {
        CurrentDay: 0, CurrentWeek: 0,
        CurrentMonth: 0, AverageDay: 0,
        AverageWeek: 0, AverageMonth: 0,
        BestDay: 0, BestWeek: 0,
        BestMonth: 0
    }

}

const chartsReducer = (state = chartsDefaultState, action) => {
    switch (action.type) {
        case SET_PIE_CHART:
            return {
                ...state,
                pieChart: action.pieChart
            }
        case SET_SUBJECT_BREAKDOWN_CHART:

            return {
                ...state,
                breakdownChart: action.breakdownChart
            }
        case SET_HOURS_WEEK:

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