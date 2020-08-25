import React, { useState } from 'react';
import { connect } from 'react-redux'
import FriendPendingSearch from './friendPendingSearch'

const FriendActivity = () => {
    const [activityShowing, setActivityShowing] = useState(true);

    const handleShowActivity = () => {
        setActivityShowing(true)
    }

    const handleShowPending = () => {
        setActivityShowing(false)
    }

    return (
        <div className="friendActivity">
            <div className="flip-container">
                <div className="flip-header" onClick={handleShowActivity} >
                    Friend Activity
                </div>
                <div className="flip-header" onClick={handleShowPending}>
                    Pending/Add Friends
                </div>
            </div>
            {activityShowing ? <div>Friend activity</div> : <FriendPendingSearch />}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        charts: state.charts,
    }
}

export default connect()(FriendActivity)