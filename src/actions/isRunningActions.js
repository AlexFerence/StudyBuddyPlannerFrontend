export const RUNNING_OFF = 'RUNNING_OFF'
export const runningOn = (profile = { email: "", password: "", token: "" }) => ({
    type: RUNNING_OFF
});

export const RUNNING_ON = 'RUNNING_ON'
export const runningOff = (classId, subjectId) => ({
    type: RUNNING_ON,
    classId,
    subjectId
})
