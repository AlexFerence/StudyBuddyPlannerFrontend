export const ADD_TASK = 'ADD_TASK'
export const addTask = (newTask) => ({
    type: ADD_TASK ,
    newTask
});

export const DELETE_TASK  = 'DELETE_TASK '
export const deleteTask = (id) => ({
    type: DELETE_TASK ,
    id
})

export const FILL_TASKS  = 'FILL_TASK'
export const fillTasks = (tasks) => ({
    type: FILL_TASKS,
    tasks
})
