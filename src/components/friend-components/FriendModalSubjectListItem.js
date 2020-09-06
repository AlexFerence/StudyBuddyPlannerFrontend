import React from 'react'

const FriendModalFriendListItem = ({ subject }) => {
    return (
        <div className="friend-modal-subject-list-item__class-name">
            <div style={{ backgroundColor: subject.color }} className="friend-modal-subject-list-item__circle"></div> {subject.name} {subject.classCode}
        </div>
    )
}

export default FriendModalFriendListItem