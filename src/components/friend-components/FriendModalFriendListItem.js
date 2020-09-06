import React from 'react'
import { connect } from 'react-redux'
import { sendRequest } from '../../thunks/friendThunk'

const FriendModalFriendListItem = ({ dispatch, friend }) => {

    const addFriend = () => {
        console.log('add friend')
        dispatch(sendRequest(friend.id))
    }

    return (
        <div className="friend-modal-friend-list-item">
            <div>
                <div className="friend-modal-friend-list-item__name">{friend.firstName} {friend.lastName}</div>
                <div className="friend-modal-friend-list-item__university">{friend.school}</div>
            </div>
            <button onClick={addFriend} className="friend-modal-friend-list-item__add-button">
                + Add
            </button>
        </div>
    )
}

export default FriendModalFriendListItem