import React, { useState } from 'react';
import { connect } from 'react-redux'
import FriendPendingSearch from './friendPendingSearch'
import FriendActiveList from './FriendActiveList'
import { IoMdAdd, IoMdClose } from 'react-icons/io';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '10%',
        left: '50%',
        right: '0%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 100001

    },
    overlay: {
        backgroundColor: 'transparent'
    }
};


const FriendActivity = () => {
    const [activityShowing, setActivityShowing] = useState(true);

    // const handleShowActivity = () => {
    //     setActivityShowing(true)
    // }

    const handleShowPending = () => {
        setActivityShowing(!activityShowing)
    }

    return (
        <div className="friend-activity">
            <div className="friend-activity__header">
                <div className="friend-activity__header__title" >
                    Friend Activity
                </div>
                <div className="friend-activity__header__bell" onClick={handleShowPending}>
                    {activityShowing ? <IoMdAdd /> : <IoMdClose />}
                </div>
            </div>
            {activityShowing ? <FriendActiveList /> : <FriendPendingSearch />}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        charts: state.charts,
    }
}

export default connect()(FriendActivity)