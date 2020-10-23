import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { FaBookReader } from 'react-icons/fa'
import {
    openFriendModal, modifyFriends, closeFriendModal,
    friendPopupIsLoadingOn, friendPopupIsLoadingOff
} from '../../actions/friendActions'
import { connect } from 'react-redux'
import { getFriendsActiveFriends, getFriendSubjects, loadSubjectBreakdown } from '../../thunks/friendThunk'
import FriendPopup from './FriendPopup'
import OutsideAlerter from './OutsideAlerter'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

const FriendActiveListItem = ({ dispatch, friend, selectedFriend, isOpen }) => {
    const openModal = async () => {
        dispatch(friendPopupIsLoadingOn())
        // set this friend as the selcted friend
        var a = await dispatch(modifyFriends({ selectedFriend: friend }))
        //open friend modal
        dispatch(openFriendModal())
        // get friends of the active friend
        var b = a + await dispatch(getFriendsActiveFriends())
        // get friends subjects
        var c = b + await dispatch(getFriendSubjects())
        // load friends subject breakdown
        var d = c + await dispatch(loadSubjectBreakdown(friend.id))
        //turn off spinning
        var e = d + dispatch(friendPopupIsLoadingOff())
    }

    const returnSymbol = () => {
        if (friend.active) {
            return (<FaBookReader />)
        }
        else if (friend.lastActiveTime == -1) {
            return (<div></div>)
        }
        else {
            return (
                <div className="last-active-time-display">
                    <div className="last-active-time-display__time">
                        {friend.lastActiveTime}
                    </div>
                    <div>
                        {friend.lastActiveUnit}
                    </div>
                </div>
            )
        }
    }

    const closeTippy = () => {
        dispatch(closeFriendModal())
    }

    return (
        <div>
            { false &&
                <div className="popup">
                    { /*  Get rid of false below to show popup again */}
                    {false &&
                        isOpen && selectedFriend.id === friend.id &&
                        <OutsideAlerter>
                            <FriendPopup />
                        </OutsideAlerter>
                    }
                </div>
            }
            <Tippy content={<FriendPopup />}
                placement="left"
                visible={isOpen && selectedFriend.id === friend.id}
                onClickOutside={closeTippy}
                maxWidth={500}
                allowHTML={true}
                animateFill={false}
                interactive={true}
                zIndex={500}
            >

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
                        <div className="last-active-icon">
                            {returnSymbol()}
                        </div>
                    </div>
                </div>
            </Tippy>
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