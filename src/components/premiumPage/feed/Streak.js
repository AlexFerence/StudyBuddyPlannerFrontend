import React from 'react'
import { connect } from 'react-redux'
import { FaUserAlt } from 'react-icons/fa'
import { AiFillFire } from 'react-icons/ai'

const Streak = ({ feedItem, friends }) => {

    const wordArray = feedItem.generalDescription.split(' ')

    const numValue = wordArray.find((num) => parseInt(num) > 0)

    const shortDesc = feedItem.generalDescription.split(' ').slice(2).join(' ');

    const getFriendInitials = (name) => {
        const friend = friends.find((f) => f.id === feedItem.userId)
        if (name && friend) {
            return (
                <span style={{ fontWeight: '600' }}>{friend?.firstName + ' ' + friend?.lastName}</span>
            )
        }
        else if (friend) {
            return (
                <span>{friend?.firstName?.charAt(0) + friend?.lastName?.charAt(0)}</span>
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
                <div className={{ width: '100%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    {numValue}
                </div>
                <AiFillFire className="toggleContainer__streak__icon" style={{ fontSize: '25px', margin: '0px 0px 7px 5px' }} />
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