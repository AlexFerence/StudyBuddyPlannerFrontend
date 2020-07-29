export const SET_PIE_CHART = 'SET_PIE_CHART'
export const setPieChart = (pieChart) => ({
    type: SET_PIE_CHART,
    pieChart
});

export const SET_SUBJECT_BREAKDOWN_CHART = 'SET_SUBJECT_BREAKDOWN_CHART'
export const setSubjectBreakdownChart = (breakdownChart) => ({
    type: SET_SUBJECT_BREAKDOWN_CHART,
    breakdownChart
});

export const SET_HOURS_WEEK = 'SET_HOURS_WEEK'
export const setHoursWeek = (hoursWeekData) => ({
    type: SET_HOURS_WEEK,
    hoursWeekData
});
