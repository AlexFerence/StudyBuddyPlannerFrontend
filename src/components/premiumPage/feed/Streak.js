import React from 'react'
import { connect } from 'react-redux'
import { FaUserAlt } from 'react-icons/fa'
import { AiFillFire } from 'react-icons/ai'

const Streak = ({ feedItem, friends }) => {

    const wordArray = feedItem.generalDescription.split()

    const getValue = wordArray

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
    // PUT FIRE ICON BIG ON THE RIGHT WITH NUMBER INSIDE
    // GET ARI TO SEND IT TO YOU 
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
                <AiFillFire className="toggleContainer__streak__icon" style={{ fontSize: '15px', margin: '0px 0px 7px 5px' }} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        friends: state.friends.activeFriends
    }
}

export default connect(mapStateToProps)(Streak)