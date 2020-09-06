import React from 'react'

const FriendModalFriendListItem = ({ friend }) => {
    return (
        <div className="friend-modal-friend-list-item">
            <div>
                <div className="friend-modal-friend-list-item__name">{friend.firstName} {friend.lastName}</div>
                <div className="friend-modal-friend-list-item__university">{friend.school}</div>
            </div>
            <div className="friend-modal-friend-list-item__add-button">
                Add
            </div>


        </div>
    )
}

export default FriendModalFriendListItem