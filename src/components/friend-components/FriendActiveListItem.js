import React from 'react'
import { FaUser } from 'react-icons/fa'
import { FaBookReader } from 'react-icons/fa'
import { openFriendModal, modifyFriends } from '../../actions/friendActions'
import { connect } from 'react-redux'
import { getFriendsActiveFriends, getFriendSubjects, loadSubjectBreakdown } from '../../thunks/friendThunk'
import FriendPopup from './FriendPopup'
import OutsideAlerter from './OutsideAlerter'

const FriendActiveListItem = ({ dispatch, friend, selectedFriend, isOpen }) => {

    const openModal = () => {
        console.log('setting friends')
        dispatch(modifyFriends({ selectedFriend: friend }))
        dispatch(openFriendModal())
        dispatch(getFriendsActiveFriends())
        dispatch(getFriendSubjects())
        dispatch(loadSubjectBreakdown(friend.id))

    }

    return (
        <div>
            <div className="popup">
                { /*  Get rid of false below to show popup again */}
                {false &&
                    isOpen && selectedFriend.id === friend.id &&
                    <OutsideAlerter>
                        <FriendPopup />
                    </OutsideAlerter>
                }
            </div>
            <div onClick={openModal} className="active-friend">
                <div className="active-friend__left">
                    <div className="active-friend__left__avatar-container">
                        <div className="active-friend__left__avatar" onClick={openModal}>
                            {friend.firstName.length > 0 && friend.lastName.length > 0 ? friend.firstName[0].toUpperCase() + friend.lastName[0].toUpperCase() : <FaUser />}
                        </div>
                    </div>
                    <div className="active-friend__left__credentials">
                        <div onClick={openModal} className="active-friend__left__credentials__name">{friend.firstName} {friend.lastName}</div>
                        <div className="active-friend__left__credentials__class">{friend.subjectName} {friend.subjectClassCode}</div>
                        {/* TASK TYPE DOESNT RETURN ANYTHING */}
                        <div className="active-friend__left__credentials__task-type">{friend.taskType}</div>
                    </div>
                </div>
                <div className="col-center">
                    <div className="last-active-icon">{friend.active ? <FaBookReader /> :
                        <div className="last-active-time-display"><div className="last-active-time-display__time">{friend.lastActiveTime}</div><div>{friend.lastActiveUnit}</div></div>}</div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isOpen: state.friends.friendModalOpen,
        selectedFriend: state.friends.selectedFriend,
        selectedFriendFriends: state.friends.selectedFriendFriends,
        selectedFriendSubjects: state.friends.selectedFriendSubjects
    }
}

export default connect(mapStateToProps)(FriendActiveListItem)

// getLastActiveTime(friend.lastActive)