export const UPDATE__PREMIUMSTATS = 'UPDATE__PREMIUMSTATS'
export const updatePremiumStats = (updates) => ({
    type: UPDATE__PREMIUMSTATS,
    updates
});

export const SET_SELECTED_SUBJECT = 'SET_SELECTED_SUBJECT'
export const setSelectedSubject = (subj) => ({
    type: SET_SELECTED_SUBJECT,
    payload: subj
});

export const SET_SELECTED_TASK_TYPE = 'SET_SELECTED_TASK_TYPE'
export const setSelectedTaskType = (taskType) => ({
    type: SET_SELECTED_TASK_TYPE,
    payload: taskType
});