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

export const MODIFY = 'MODIFY'
export const modify = (data) => ({
    type: MODIFY,
    data
});

export const SET_HOURS_WEEK = 'SET_HOURS_WEEK'
export const setHoursWeek = (hoursWeekData) => ({
    type: SET_HOURS_WEEK,
    hoursWeekData
});

export const SET_YEAR_BREAKDOWN = 'SET_YEAR_BREAKDOWN'
export const setYearBreakdown = (yearData) => ({
    type: SET_YEAR_BREAKDOWN,
    yearData
});

export const SET_YEAR_XAXIS = 'SET_YEAR_XAXIS'
export const setYearXAxis = (xAxis) => ({
    type: SET_YEAR_XAXIS,
    xAxis
});

export const SET_FACULTY_BREAKDOWN = 'SET_FACULTY_BREAKDOWN'
export const setFacultyBreakdown = (yearData) => ({
    type: SET_FACULTY_BREAKDOWN,
    yearData
});

export const SET_FACULTY_XAXIS = 'SET_FACULTY_XAXIS'
export const setFacultyXAxis = (xAxis) => ({
    type: SET_FACULTY_XAXIS,
    xAxis
});

export const SET_GPA_SCATTER = 'SET_GPA_SCATTER'
export const setGpaScatter = (gpaScatterData) => ({
    type: SET_GPA_SCATTER,
    gpaScatterData
});

