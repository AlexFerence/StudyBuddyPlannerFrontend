import React from 'react'
import { connect } from 'react-redux'
import { FaUserAlt } from 'react-icons/fa'
import { AiFillFire } from 'react-icons/ai'

const Streak = ({ feedItem, friends, yourId }) => {

    const wordArray = feedItem.generalDescription.split(' ')

    const numValue = wordArray.find((num) => parseInt(num) > 0)

    const shortDesc = feedItem.generalDescription.split(' ').slice(2).join(' ');

    const getFriendInitials = (name) => {
        const friend = friends.find((f) => f.id === feedItem.userId)
        if (name && friend && friend.firstName && friend.lastName) {
            return (
                <span style={{ fontWeight: '600' }}>{friend.firstName + ' ' + friend.lastName}</span>
            )
        }
        else if (name && feedItem.userId === yourId) {
            return ('You')
        }
        else if (friend && friend.firstName && friend.lastName) {
            return (
                <span>{(friend.firstName.charAt(0) || '') + (friend.lastName.charAt(0) || '')}</span>
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
            <div style={{ position: 'relative' }}>
                <AiFillFire className="toggleContainer__streak__icon" />
                <div className="toggleContainer__streak__value">
                    {numValue}
                </div>

            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        friends: state.friends.activeFriends,
        yourId: state.profile.id
    }
}

export default connect(mapStateToProps)(Streak)