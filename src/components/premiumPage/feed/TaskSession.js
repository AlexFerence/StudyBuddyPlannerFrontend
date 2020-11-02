import React from 'react'
import { connect } from 'react-redux'
import { FaUserAlt } from 'react-icons/fa'

const TaskSession = ({ feedItem, friends }) => {

    const shortDesc = feedItem.generalDescription.split(' ').slice(2).join(' ');

    const getFriendInitials = (name) => {
        const friend = friends.find((f) => f.id === feedItem.userId)

        if (!friend) {
            friend = { firstName: '', lastName: '' }
        }

        if (name && friend) {
            return (
                <span style={{ fontWeight: '600' }}>{friend?.firstName + ' ' + friend?.lastName}</span>
            )
        }
        else if (friend) {
            return (
                <span>{friend?.firstName.charAt(0) + friend?.lastName.charAt(0)}</span>
            )
        }
        else {
            return <span><FaUserAlt /></span>
        }
    }

    return (
        <div className="feed-item" >
            <div className="active-friend__left__avatar">
                {getFriendInitials(false)}
            </div>
            <div className="feed-description">
                {getFriendInitials(true)}
                {' ' + shortDesc}
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