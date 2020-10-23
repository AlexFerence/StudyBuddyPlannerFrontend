import {
    SET_FRIENDS, SET_FRIENDS_MODAL,
    FRIEND_POPUP_IS_LOADING_ON, FRIEND_POPUP_IS_LOADING_OFF
} from '../actions/friendActions'

const friendsDefaultState = {
    githubCalendarData: [],
    friendStreaks: [],
    suggestedFriends: [],
    waitingRequests: [],
    sentRequests: [],
    activeFriends: [],
    selectedFriend: {
        friendRowId: 0,
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
    friendModalOpen: false,
    friendPopupIsLoading: false,
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
        case FRIEND_POPUP_IS_LOADING_ON:
            return {
                ...state,
                friendPopupIsLoading: true
            }
        case FRIEND_POPUP_IS_LOADING_OFF:
            return {
                ...state,
                friendPopupIsLoading: false
            }
        default:
            return state
    }
}

export default friendsReducer