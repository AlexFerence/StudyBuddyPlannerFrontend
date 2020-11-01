import React from 'react'
import { connect } from 'react-redux'
import { FaUserAlt } from 'react-icons/fa'

const TaskSession = ({ feedItem, friends }) => {

    const getFriendInitials = () => {
        const friend = friends.find((f) => f.id === feedItem.userId)
        if (friend) {
            return (
                <span>{friend.firstName.charAt(0) + friend.lastName.charAt(0)}</span>
            )
        }
        else {
            return <span><FaUserAlt /></span>
        }
    }

    return (
        <div className="feed-item" >
            <div className="active-friend__left__avatar">
                {getFriendInitials()}
            </div>
            <div className="feed-description">
                {feedItem.generalDescription}
                <span className="feed-description__time">
                    {' ' + feedItem.feedTime + ' ' + feedItem.feedUnit}
                </span>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        friends: state.friends.activeFriends
    }
}

export default connect(mapStateToProps)(TaskSession)