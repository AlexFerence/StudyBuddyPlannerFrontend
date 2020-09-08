import { SET_FRIENDS, SET_FRIENDS_MODAL } from '../actions/friendActions'

const friendsDefaultState = {
    waitingRequests: [],
    sentRequests: [],
    activeFriends: [],
    selectedFriend: {
        id: 0,
        firstName: "",
        lastName: "",
        school: "",
        faculty: "",
        major: "",
        subjectName: "",
        subjectClassCode: "",
        taskType: "",
        taskDescription: "",
        lastActive: "",
        active: 0,
        timezoneOffset: 0,
        lastActiveTime: "",
        lastActiveUnit: "",
    },
    selectedFriendFriends: [],
    selectedFriendSubjects: [],
    selectedFriendSubjectsBreakdown: [],
    selectedFriendSubjectsColors: [],
    friendModalOpen: false
}

const friendsReducer = (state = friendsDefaultState, action) => {
    switch (action.type) {
        case SET_FRIENDS:
            return {
                ...state,
                ...action.updates
            }
        case SET_FRIENDS_MODAL:
            return {
                ...state,
                friendModalOpen: action.modalState
            }

        default:
            return state
    }
}

export default friendsReducer