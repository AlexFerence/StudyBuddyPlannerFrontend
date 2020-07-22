export const RUNNING_OFF = 'RUNNING_OFF'
export const runningReduxOff = () => ({
    type: RUNNING_OFF
});

export const RUNNING_ON = 'RUNNING_ON'
export const runningReduxOn = (taskId) => ({
    type: RUNNING_ON,
    taskId
})

export const PAUSED_OFF = 'PAUSED_OFF'
export const pausedReduxOff = () => ({
    type: PAUSED_OFF

})

export const PAUSED_ON = 'PAUSED_ON'
export const pausedReduxOn = () => ({
    type: PAUSED_ON

})


