import React from 'react'
import { connect } from 'react-redux'
import { sendRequest, getAlreadyFriends, getAlreadyPending, isMe, getFriendsActiveFriends } from '../../thunks/friendThunk'
import { IoMdPerson, IoMdCheckmark } from 'react-icons/io'

const FriendModalFriendListItem = ({ dispatch, friend }) => {

    const addFriend = () => {
        console.log('add friend')
        dispatch(sendRequest(friend.id))
        dispatch(getFriendsActiveFriends())
    }

    const getFriendAction = () => {
        var alreadyFriends = dispatch(getAlreadyFriends(friend.id))
        var pending = dispatch(getAlreadyPending(friend.id))
        var me = dispatch(isMe(friend.id))
        if (alreadyFriends) {
            console.log(alreadyFriends)
            return (
                <div className="friend-modal-friend-list-item__already-added"><IoMdPerson /><IoMdCheckmark /></div>
            )
        }
        else if (me) {
            return (
                <div></div>
            )
        }
        else if (pending) {
            return (
                <div className="friend-modal-friend-list-item__pending">Pending ...</div>
            )
        }
        return (
            <div id="but-add-friend" onClick={addFriend} className="friend-modal-friend-list-item__add-button">
                + Add
            </div>
        )

    }

    return (
        <div className="friend-modal-friend-list-item">
            <div>
                <div className="friend-modal-friend-list-item__name">{friend.firstName} {friend.lastName}</div>
                <div className="friend-modal-friend-list-item__university">{friend.school}</div>
            </div>
            {getFriendAction()}
        </div>
    )
}

export default connect()(FriendModalFriendListItem)