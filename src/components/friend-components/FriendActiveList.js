import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getActiveFriends, getPendingFriends } from '../../thunks/friendThunk'
import FriendActiveListItem from './FriendActiveListItem'
import CustomOverlay from '../CustomOverlay'

const FriendActiveList = ({ dispatch, activeFriends }) => {
    useEffect(() => {
        dispatch(getActiveFriends())
        dispatch(getPendingFriends())
    }, [])

    return (
        <div className="friend-active-list-holder">
            {
                activeFriends.map((friend) => {
                    return (
                        <FriendActiveListItem key={friend.lastActive} friend={friend} />
                    )
                })
            }
            {activeFriends.length === 0 && <div style={{ padding: '15px' }}>
                <CustomOverlay message="Add Friends by hitting the + icon" />
            </div>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        activeFriends: state.friends.activeFriends,
    }
}

export default connect(mapStateToProps)(FriendActiveList)