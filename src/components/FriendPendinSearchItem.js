import React from 'react'
import { connect } from 'react-redux'
import { acceptRequest, declineRequest, getPendingFriends } from '../thunks/friendThunk'
import { FaCheck, FaRegWindowClose } from 'react-icons/fa'

const AcceptDeclineItem = ({ request, dispatch }) => {

    const handleAcceptRequest = async (rowId) => {
        await dispatch(acceptRequest(rowId))
        dispatch(getPendingFriends())
    }

    const handleDeclineRequest = async (rowId) => {
        await dispatch(declineRequest(rowId))
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
                    request.displayType === "AcceptDecline" ? <div>
                        <button onClick={handleAcceptRequest(request.id)}><FaCheck /></button>
                        <button onClick={handleDeclineRequest(request.id)}><FaRegWindowClose /></button>
                    </div> : <div>Pending ...</div>
                }
            </div>
        </div >
    )
}

export default connect()(AcceptDeclineItem)