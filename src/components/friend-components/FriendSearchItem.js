import React, { useState } from 'react'
import { connect } from 'react-redux'
import { IoMdPerson, IoMdCheckmark } from 'react-icons/io'
import { searchIfExists, sendRequest, searchUsers, getPendingFriends } from '../../thunks/friendThunk'

//import { modifyFriends } from '../../actions/friendActions'
import {
    declineRequest, getAlreadyFriends, getAlreadyPending, isMe,
    getFriendsActiveFriends, getActiveFriends
} from '../../thunks/friendThunk'
import Spinner from '../shared/Spinner'

const FriendSearchItem = ({ person, dispatch }) => {

    const [spinning, setSpinning] = useState(false)

    const addFriend = async (friend) => {
        setSpinning(true)
        const t = await dispatch(sendRequest(friend.id))
        const u = t + await dispatch(getActiveFriends())
        //const v = u + await dispatch(modifyFriends({ selectedFriend }))
        const w = u + await dispatch(getFriendsActiveFriends())
        const x = w + setSpinning(false)
    }

    const handleCancelRequest = async (row) => {
        setSpinning(true)
        var a = await dispatch(declineRequest(row?.id))
        const b = a + await dispatch(getActiveFriends())
        //const c = b + await dispatch(modifyFriends({ selectedFriend }))
        const d = b + await dispatch(getFriendsActiveFriends())
        var e = d + await dispatch(getPendingFriends())
        const f = e + setSpinning(false)
    }

    const getFriendAction = (friend) => {
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
                    {spinning ? <Spinner /> :
                        <div id="but-add-friend" onClick={() => handleCancelRequest(pending)} className="friend-modal-friend-list-item__add-button">
                            Cancel
                        </div>
                    }
                </div>
            )
        }
        return (
            <React.Fragment>
                { spinning ? <Spinner /> : <div id="but-add-friend" onClick={() => addFriend(friend)} className="friend-modal-friend-list-item__add-button">
                    + Add
                </div>}
            </React.Fragment>
        )

    }

    return (
        <div key={person.id} className="suggest-person">
            <div>
                <div className="suggest-person__name">{person.firstName} {person.lastName}</div>
                <div className="suggest-person__email">{person.email}</div>
            </div>
            {
                getFriendAction(person)
            }
        </div>
    )
}

export default connect()(FriendSearchItem)