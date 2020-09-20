import React, { useEffect } from 'react'
import { Spinner } from 'react-bootstrap';

const FriendSpinningPopup = ({ dispatch, isOpen, selectedFriend, selectedFriendFriends,
    selectedFriendSubjects }) => {

    return (
        <div style={{ zIndex: 500 }}>
            <div className="friend-modal">
                <Spinner />
            </div>
        </div>
    )
}

export default FriendSpinningPopup