import { ReactTinyLink } from 'react-tiny-link'
import React from 'react'
import { connect } from 'react-redux'
import { FaUserAlt, FaMountain, FaCheck } from 'react-icons/fa'
import { IoIosBook } from 'react-icons/io'

const FiveHoursSpent = ({ feedItem, friends, yourId }) => {
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

    const getFriendDescription = () => (
        <div>
            {getFriendInitials(true)}
            <span>{' ' + shortDesc}</span>
        </div>
    )

    return (
        <div className="feed-theme">
            <div className="feed-theme__top-row">
                <div className="feed-theme-initials"
                    style={{ backgroundColor: 'white' }}
                >
                    {getFriendInitials(false)}
                </div>
                <div className="feed-theme__title">
                    New StudyBuddy Blog Post
                </div>
                <IoIosBook className="feed-theme__top-row__icon" />
            </div>
            <div className="feed-theme__bottom-row"
                style={{ marginRight: '40px' }}
            >
                <ReactTinyLink
                    cardSize="small"
                    showGraphic={true}
                    maxLine={2}
                    minLine={1}
                    url={feedItem.generalDescription}
                />
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

export default connect(mapStateToProps)(FiveHoursSpent)