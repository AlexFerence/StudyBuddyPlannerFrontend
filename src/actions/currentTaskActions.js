export const SET__CURRENTTASK = 'SET__CURRENTTASK'
export const setCurrentTask = (currentTask) => ({
    type: SET__CURRENTTASK,
    currentTask
});

export const SHOW__COMPLETED__TASKS = 'SHOW__COMPLETED__TASKS'
export const showCompletedTasksAction = () => ({
    type: SHOW__COMPLETED__TASKS,
});

export const HIDE__COMPLETED__TASKS = 'HIDE__COMPLETED__TASKS'
export const hideCompletedTasksAction = () => ({
    type: HIDE__COMPLETED__TASKS,
});