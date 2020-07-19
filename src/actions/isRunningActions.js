export const RUNNING_OFF = 'RUNNING_OFF'
export const runningReduxOff = () => ({
    type: RUNNING_OFF
});

export const RUNNING_ON = 'RUNNING_ON'
export const runningReduxOn = (taskId) => ({
    type: RUNNING_ON,
    taskId
})
