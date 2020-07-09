export const ADD_SUBJECT = 'ADD_SUBJECT'
export const addSubject = (newSubject) => ({
    type: ADD_SUBJECT,
    newSubject
});

export const DELETE_SUBJECT = 'DELETE_SUBJECT'
export const deleteSubject = (id) => ({
    type: DELETE_SUBJECT,
    id
})

export const FILL_SUBJECTS = 'FILL_SUBJECTS'
export const fillSubjects = (subjects) => ({
    type: FILL_SUBJECTS,
    subjects
})
