import React, { useState } from 'react';
import { connect } from 'react-redux'
import FriendPendingSearch from './friendPendingSearch'
import FriendActiveList from './FriendActiveList'
import { IoMdAdd, IoMdClose } from 'react-icons/io';
import swal from 'sweetalert'
//import FriendModal from './FriendModal'


const FriendActivity = ({ waitingRequests }) => {
    const [activityShowing, setActivityShowing] = useState(true);

    const handleShowPending = () => {
        setActivityShowing(!activityShowing)
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText('https://www.studybuddyplanner.com/')
        swal({
            title: "Invite Link Copied to clipboard",
            text: "https://www.studybuddyplanner.com/",
            icon: "success",

            confirmButtonColor: '#fb4033',
            cancelButtonColor: '#fb4033',
        })
    }

    const plusOrX = () => {
        if (activityShowing) {
            return (
                <div className="plus-container">
                    <IoMdAdd />

                    {waitingRequests && waitingRequests.length > 0 && <div className="badge">{waitingRequests.length}</div>}
                </div>
            )
        }
        else {
            return (
                <IoMdClose />
            )
        }
    }

    return (
        <div className="friend-activity">
            <div className="friend-activity__header">
                <div className="friend-activity__header__title" >
                    Friend Activity
                </div>
                <div className="friend-activity__header__bell" onClick={handleShowPending}>
                    {plusOrX()}
                </div>
            </div>
            {activityShowing ? <FriendActiveList /> : <FriendPendingSearch />}
            <button className="invite-friends" onClick={copyToClipboard}>Invite Friends</button>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        waitingRequests: state.friends.waitingRequests
    }
}

export default connect(mapStateToProps)(FriendActivity)