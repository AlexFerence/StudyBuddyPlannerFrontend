import axios from 'axios';
import { runningReduxOn, runningReduxOff } from '../actions/isRunningActions';
import url from '../environment/url';
import { modifyFriends } from '../actions/friendActions'
import moment from 'moment'

export const searchIfExists = (email) => async (dispatch, getState) => {
    const state = getState()
    const { profile } = state
    const { token } = profile
    if (email.length === 0) {
        return undefined
    }
    try {
        const res = await axios.get(url + '/api/userprofiles/' + email + '/true',
            {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        return res.data

    } catch (e) {
        console.log(e)
    }
}


// status 415 is if they already have the person as a friend
export const sendRequest = (otherID) => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    try {
        const res = await axios.post(url + '/api/Friends/sendRequest', {
            userId1: id,
            userId2: otherID,
        },
            {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )
        dispatch(getPendingFriends())
        var y = await dispatch(getFriendsActiveFriends()) + res
        return res.status
    } catch (e) {
        dispatch(getPendingFriends())
        console.log(e)
        if (e.response) {
            return (e.response.status)
        }
        return (e)
    }
}

export const getPendingFriends = (otherID) => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    try {
        const res = await axios.post(url + '/api/Friends/getListFriends',
            {
                id,
                pending: true
            }
            ,
            {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )
        var sentRequests = []
        var waitingRequests = []

        if (res.status === 200 && res.data.length > 0) {
            res.data.forEach((request) => {
                if (request.displayType === 'AcceptDecline') {
                    // add to waiting rquests
                    waitingRequests.push(request)
                }
                else if (request.displayType === "Sent") {
                    // add to sent requests
                    sentRequests.push(request)
                }
            })
        }
        dispatch(modifyFriends({ sentRequests, waitingRequests }))
    } catch (e) {
        console.log(e)
    }
}

export const acceptRequest = (otherID) => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    try {
        const res = await axios.post(url + '/api/Friends/acceptRequest',
            otherID,
            {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )
        dispatch(getPendingFriends())
        dispatch(getActiveFriends())
        return (res.data);


    } catch (e) {
        console.log(e)
    }
}

export const declineRequest = (otherID) => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    try {
        const res = await axios.delete(url + '/api/Friends/' + otherID,
            {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )
        dispatch(getPendingFriends())
        return (res.data);

    } catch (e) {
        dispatch(getPendingFriends())
        console.log(e)
    }
}

export const getActiveFriends = () => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    try {
        var now = new Date()
        const res = await axios.post(url + '/api/Friends/getListActiveFriends',
            {
                id,
                currentTime: moment().format(),
                //timezoneOffset: now.getTimezoneOffset() / 60
            }

            ,
            {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )

        //console.log(res.data)
        var activeFriends = []

        if (res.status === 200 && res.data.length > 0) {
            res.data.forEach((friend) => {
                activeFriends.push(friend)
            })
        }
        dispatch(modifyFriends({ activeFriends }))
    } catch (e) {
        console.log(e)
    }
}

export const getFriendsActiveFriends = () => async (dispatch, getState) => {
    const state = getState()
    const { profile, friends } = state
    const { token } = profile
    const { selectedFriend } = friends
    const { id = 0 } = selectedFriend
    try {
        const res = await axios.post(url + '/api/Friends/getListActiveFriends',
            {
                id,
                currentTime: moment().format(),
            },
            {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )

        //console.log(res.data)
        var selectedFriendFriends = []

        if (res.status === 200 && res.data.length > 0) {
            res.data.forEach((friend) => {
                selectedFriendFriends.push(friend)
            })
        }
        dispatch(modifyFriends({ selectedFriendFriends }))
    } catch (e) {
        console.log(e)
    }
}

export const getFriendSubjects = () => async (dispatch, getState) => {
    const state = getState()
    const { profile, friends } = state
    const { token } = profile
    const { selectedFriend } = friends
    const { id = 0 } = selectedFriend
    try {

        const res = await axios.post(url + '/api/subjects/list',
            {
                UserId: id
            }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        var selectedFriendSubjects = []

        selectedFriendSubjects = res.data


        dispatch(modifyFriends({ selectedFriendSubjects }))
    }
    catch (e) {
        console.log(e)
    }
}

export const getAlreadyFriends = (id) => (dispatch, getState) => {
    const state = getState()
    const { friends } = state
    const { activeFriends } = friends
    if (activeFriends.length > 0) {
        var result = activeFriends.find((friend) => friend.id === id)
        return result
    }
    else {
        return false
    }
}

export const getAlreadyPending = (id) => (dispatch, getState) => {
    const state = getState()
    const { friends } = state
    const { sentRequests } = friends

    if (sentRequests.length > 0) {
        var result = sentRequests.find((friend) => {
            if (friend.userId2 === id) {
                return (friend.id)
            }
        })

        return result
    }
    else {
        return false
    }
}
export const isMe = (friendId) => (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
    if (friendId === id) {
        return true
    }
    return false
}


export const loadSubjectBreakdown = (id) => async (dispatch, getState) => {
    const state = getState()
    const { profile } = state
    const { token } = profile
    try {
        // error
        const res = await axios.post(url + '/api/PersonalCharts/listsubjecttotalhours',
            {
                userId: id,
            }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        if (res.status === 200) {
            var pieData = []
            var pieColors = []
            res.data.responseItems.forEach((item) => {
                //console.log(item)
                pieData.push({
                    value: item.value1,
                    name: item.name1,
                })
                pieColors.push(item.name2)
                //get him to send subjectId along with name 2
            })
            //console.log(pieData)
            dispatch(modifyFriends({
                selectedFriendSubjectsBreakdown: pieData,
                selectedFriendSubjectsBreakdownColors: pieColors
            }))

        }
    } catch (e) {
        return (e)
    }
}

export const removeFriend = () => async (dispatch, getState) => {
    const state = getState()
    const { profile, friends } = state
    const { token } = profile
    const { selectedFriend } = friends
    const { friendRowId } = selectedFriend
    try {
        const res = await axios.delete(url + '/api/Friends/' + friendRowId,
            {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        dispatch(getActiveFriends())
        //dispatch(closeFriendModal())

    } catch (e) {
        return (e)
    }
}