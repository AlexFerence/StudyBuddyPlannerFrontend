import { SET_SUBJTOADD } from '../actions/signupThirdActions'

const subjectDefaultState = [
    {
        subTitle: '',
        classCode: '',
        description: ''
    },
    {
        subTitle: '',
        classCode: '',
        description: ''
    },
    {
        subTitle: '',
        classCode: '',
        description: ''
    },
    {
        subTitle: '',
        classCode: '',
        description: ''
    },
    {
        subTitle: '',
        classCode: '',
        description: ''
    },
]

const signupThirdReducer = (state = subjectDefaultState, action) => {
    const index = action.index
    switch (action.type) {
        case SET_SUBJTOADD:
            const stateCopy = [...state]
            stateCopy[index] = action.payload
            return stateCopy
        default:
            return state
    }
}

export default signupThirdReducer