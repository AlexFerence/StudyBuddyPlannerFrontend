import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
    sendRequest, declineRequest, getAlreadyFriends, getAlreadyPending, isMe,
    getFriendsActiveFriends, getPendingFriends, getActiveFriends
} from '../../../thunks/friendThunk'
import { IoMdPerson, IoMdCheckmark, IoMdPaperPlane } from 'react-icons/io'
import { modifyFriends } from '../../../actions/friendActions'
import Spinner from '../../shared/Spinner'

const FriendModalFriendListItem = ({ dispatch, friend, selectedFriend }) => {

    const [spinning, setSpinning] = useState(false)

    const addFriend = async () => {
        setSpinning(true)
        const t = await dispatch(sendRequest(friend.id))
        const u = t + await dispatch(getActiveFriends())
        const v = u + await dispatch(modifyFriends({ selectedFriend }))
        const w = v + await dispatch(getFriendsActiveFriends())
        const x = w + setSpinning(false)
    }

    const handleCancelRequest = async (row) => {
        setSpinning(true)
        var a = await dispatch(declineRequest(row?.id))
        const b = a + await dispatch(getActiveFriends())
        const c = b + await dispatch(modifyFriends({ selectedFriend }))
        const d = c + await dispatch(getFriendsActiveFriends())
        var e = d + await dispatch(getPendingFriends())
        const f = e + setSpinning(false)
    }

    const getFriendAction = () => {
        var alreadyFriends = dispatch(getAlreadyFriends(friend.id))
        var pending = dispatch(getAlreadyPending(friend.id))
        var me = dispatch(isMe(friend.id))
        if (alreadyFriends) {
            return (
                <div className="friend-modal-friend-list-item__already-added"><IoMdPerson /><IoMdCheckmark /></div>
            )
        }
        else if (me) {
            return (
                <div></div>
            )
        }
        else if (pending) {
            return (
                <div className="friend-modal-friend-list-item__pending">
                    {spinning ? <Spinner dark={true} /> :
                        <div id="but-add-friend" onClick={() => handleCancelRequest(pending)} className="friend-modal-friend-list-item__add-button">
                            Cancel
                        </div>
                    }
                </div>
            )
        }
        return (
            <React.Fragment>
                {spinning ? <Spinner dark={true} /> :
                    <div id="but-add-friend" onClick={() => addFriend()} className="friend-modal-friend-list-item__add-button">
                        + Add
                    </div>
                }
            </React.Fragment>

        )

    }

    return (
        <div className="friend-modal-friend-list-item">
            <div>
                <div style={{ textTransform: 'capitalize' }} className="friend-modal-friend-list-item__name">{friend.firstName} {friend.lastName}</div>
                <div className="friend-modal-friend-list-item__university">{friend.school}</div>
            </div>
            {getFriendAction()}
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        selectedFriend: state.friends.selectedFriend,
    }
}

export default connect(mapStateToProps)(FriendModalFriendListItem)