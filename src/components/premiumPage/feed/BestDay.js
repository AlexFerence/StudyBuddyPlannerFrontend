import React from 'react'
import { connect } from 'react-redux'
import { FaUserAlt, FaMountain, FaTrophy } from 'react-icons/fa'
import { IoIosTrophy } from 'react-icons/io'

const BestDay = ({ feedItem, friends }) => {

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
        <div className="feed-theme">
            <div className="feed-theme__top-row">
                <div className="feed-theme-initials">
                    {getFriendInitials(false)}
                </div>
                <div className="feed-theme__title">
                    New Leaderboard
                </div>
                <FaTrophy className="feed-theme__top-row__icon"
                    style={{ color: '#FFD700' }}
                />
            </div>
            <div className="feed-theme__bottom-row">
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

export default connect(mapStateToProps)(BestDay)