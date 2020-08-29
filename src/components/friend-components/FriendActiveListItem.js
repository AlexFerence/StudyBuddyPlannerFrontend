import React from 'react'
import { FaPen } from 'react-icons/fa'
import { FaBookReader } from 'react-icons/fa'
import moment from 'moment'

const getTimeSince = (time) => {
    const startTime = moment(time)
    const end = moment()
    var duration = moment.duration(end.diff(startTime));
    var hours = duration.asHours()
    console.log(startTime.format("YYYY MM DD"))
    return hours
}


const FriendActiveListItem = ({ friend }) => {
    return (
        <div className="active-friend">
            <div className="active-friend__left">
                <div className="active-friend__left__avatar-container">
                    <div className="active-friend__left__avatar">AF</div>
                </div>
                <div className="active-friend__left__credentials">
                    <div className="active-friend__left__credentials__name">{friend.firstName} {friend.lastName}</div>
                    <div className="active-friend__left__credentials__class">{friend.subjectName} {friend.subjectClassCode}</div>
                    {/* TASK TYPE DOESNT RETURN ANYTHING */}
                    <div className="active-friend__left__credentials__task-type">{friend.taskDescription} {friend.subjectClassCode}</div>
                </div>
            </div>
            <div className="col-center">
                <div className="last-active-icon">{friend.active ? <FaBookReader /> : getTimeSince(friend.lastActive)}</div>
            </div>
        </div>
    )
}


export default (FriendActiveListItem)

// getLastActiveTime(friend.lastActive)