import React from 'react'
import { connect } from 'react-redux'
import { acceptRequest, declineRequest, getPendingFriends } from '../../thunks/friendThunk'
import { FaCheck, FaRegWindowClose } from 'react-icons/fa'

const AcceptDeclineItem = ({ request, dispatch }) => {
    const handleAcceptRequest = (rowId) => {
        console.log('accepting')
        console.log('SHOULD NOT LOG ON LOAD')
        dispatch(acceptRequest(rowId))
        dispatch(getPendingFriends())
    }

    const handleDeclineRequest = (rowId) => {
        console.log('SHOULD NOT LOG ON LOAD')
        dispatch(declineRequest(rowId))
        dispatch(getPendingFriends())
    }
    return (
        <div className="accept-decline-item">
            <div>AF</div>
            <div>
                <div>{request.requestFirstName} {request.requestLastName}</div>
                <div>{request.requestEmail}</div>
            </div>
            <div>
                {
                    request.displayType === "AcceptDecline" ?
                        <div className="accept-decline-buttons">
                            <div onClick={() => handleAcceptRequest(request.id)}><FaCheck /></div>
                            <div onClick={() => handleDeclineRequest(request.id)}><FaRegWindowClose /></div>
                        </div>
                        : <div>Pending ...</div>
                }
            </div>
        </div>
    )
}

export default connect()(AcceptDeclineItem)