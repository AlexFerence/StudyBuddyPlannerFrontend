import React, { useState } from 'react';
import { connect } from 'react-redux'
import FriendPendingSearch from './friendPendingSearch'
import FriendActiveList from './FriendActiveList'
import { IoMdAdd, IoMdClose } from 'react-icons/io';
//import FriendModal from './FriendModal'




const FriendActivity = () => {
    const [activityShowing, setActivityShowing] = useState(true);

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