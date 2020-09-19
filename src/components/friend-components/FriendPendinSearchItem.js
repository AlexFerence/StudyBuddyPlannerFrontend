import React from 'react'
import { connect } from 'react-redux'
import { acceptRequest, declineRequest, getPendingFriends } from '../../thunks/friendThunk'
import { IoMdClose, IoMdCheckmark } from 'react-icons/io'

const AcceptDeclineItem = ({ request, dispatch }) => {
    const handleAcceptRequest = async (rowId) => {
        console.log('accepting')
        var x = await dispatch(acceptRequest(rowId))
        var y = x + await dispatch(getPendingFriends())
    }

    const handleDeclineRequest = async (rowId) => {
        var z = await dispatch(declineRequest(rowId))
        var q = z + await dispatch(getPendingFriends())
    }
    return (
        <div className="accept-decline-item">
            <div>
                <div className="accept-decline-item__name">{request.requestFirstName} {request.requestLastName}</div>
                <div className="accept-decline-item__email">{request.requestEmail}</div>
            </div>
            <div>
                {
                    request.displayType === "AcceptDecline" ?
                        <div className="accept-decline-item__buttons-container">
                            <div className="accept-decline-item__button"
                                onClick={() => handleAcceptRequest(request.id)}>
                                <IoMdCheckmark />
                            </div>
                            <div className="accept-decline-item__button"
                                onClick={() => handleDeclineRequest(request.id)}>
                                <IoMdClose />
                            </div>
                        </div>
                        : <div>Pending ...</div>
                }
            </div>
        </div>
    )
}

export default connect()(AcceptDeclineItem)