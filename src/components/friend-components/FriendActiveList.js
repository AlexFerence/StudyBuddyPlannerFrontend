import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getActiveFriends } from '../../thunks/friendThunk'
import FriendActiveListItem from './FriendActiveListItem'

const FriendActiveList = ({ dispatch, activeFriends }) => {
    useEffect(() => {
        dispatch(getActiveFriends())
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
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        activeFriends: state.friends.activeFriends,
    }
}

export default connect(mapStateToProps)(FriendActiveList)