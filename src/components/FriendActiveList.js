import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getActiveFriends } from '../thunks/friendThunk'

const FriendActiveList = ({ dispatch }) => {
    useEffect(() => {
        dispatch(getActiveFriends())
    }, [])

    return (
        <div>
            asdf
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        activeFriends: state.friends.activeFriends,
    }
}

export default connect(mapStateToProps)(FriendActiveList)