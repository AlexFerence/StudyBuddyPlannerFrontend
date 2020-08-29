import React, { useState } from 'react';
import { connect } from 'react-redux'
import FriendPendingSearch from './friendPendingSearch'
import FriendActiveList from './FriendActiveList'

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
                    Add Friends
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