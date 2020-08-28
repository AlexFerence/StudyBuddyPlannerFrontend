import React from 'react'
import { FaPen } from 'react-icons/fa'


const FriendActiveListItem = ({ friend }) => {
    return (
        <div className="active-friend">
            <div className="active-friend__left">
                <div className="active-friend__left__avatar">AF</div>
                <div className="active-friend__left__credentials">
                    <div className="active-friend__left__name">{friend.firstName} {friend.lastName}</div>
                    <div className="active-friend__left__class">{friend.subjectName} {friend.subjectClassCode}</div>
                </div>
            </div>
            <div className="col-center">
                <div>{friend.active ? "active" : "last active ..."}</div>
            </div>
        </div>
    )
}


export default (FriendActiveListItem)