import React from 'react'


const FriendActiveListItem = ({ friend }) => {
    return (
        <div>
            <div>{friend.firstName} {friend.lastName}</div>
            <div>{friend.active ? "active" : "last active ..."}</div>
        </div>
    )
}


export default (FriendActiveListItem)