export const SET_FRIENDS = 'SET_FRIENDS'
export const SET_FRIENDS_MODAL = 'SET_FRIENDS_MODAL'

export const modifyFriends = (updates) => ({
    type: SET_FRIENDS,
    updates
});

export const closeFriendModal = () => ({
    type: SET_FRIENDS_MODAL,
    modalState: false
})

export const openFriendModal = () => ({
    type: SET_FRIENDS_MODAL,
    modalState: true
})

export const FRIEND_POPUP_IS_LOADING_ON = 'FRIEND_POPUP_IS_LOADING_ON'
export const friendPopupIsLoadingOn = () => ({
    type: FRIEND_POPUP_IS_LOADING_ON
})

export const FRIEND_POPUP_IS_LOADING_OFF = 'FRIEND_POPUP_IS_LOADING_ON'
export const friendPopupIsLoadingOff = () => ({
    type: FRIEND_POPUP_IS_LOADING_OFF
})