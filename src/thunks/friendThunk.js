import axios from 'axios';
import { runningReduxOn, runningReduxOff } from '../actions/isRunningActions';
import url from '../environment/url';
import { modifyFriends } from '../actions/friendActions'


export const searchIfExists = (email) => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile
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

        return (res.data);

    } catch (e) {
        console.log(e)
    }
}

export const getPendingFriends = (otherID) => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile

    console.log('GETTING PENDING FRIENDDS')
    try {
        const res = await axios.post(url + '/api/Friends/getListPendingFriends',
            id
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
        console.log(res.data)

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
        const res = await axios.post(url + '/api/Friends/declineRequest', otherID,
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
        console.log(e)
    }
}

export const getActiveFriends = (otherID) => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects } = state
    const { id, token } = profile

    console.log('GETTING PENDING FRIENDDS')
    try {
        const res = await axios.post(url + '/api/Friends/getListActiveFriends',
            id
            ,
            {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )

        console.log(res.data)
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