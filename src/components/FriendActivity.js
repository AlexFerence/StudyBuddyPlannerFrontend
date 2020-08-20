import React, { useState } from 'react';
import { connect } from 'react-redux'
import FriendPendingSearch from './friendPendingSearch'

const FriendActivity = () => {
    const [activityShowing, setActivityShowing] = useState(true);

    return (
        <div className="friendActivity">
            <div className="flip-container">
                <div className="flip-header" >
                    Friend Activity
                </div>
                <div className="flip-header">
                    Pending/Add Friends
                </div>
            </div>
            <FriendPendingSearch />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        charts: state.charts,
    }
}

export default connect()(FriendActivity)