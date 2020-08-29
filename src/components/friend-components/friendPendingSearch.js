import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { searchIfExists, sendRequest, getPendingFriends } from '../../thunks/friendThunk'

import AcceptDeclineItem from './FriendPendinSearchItem'

const FriendPendingActivity = ({ dispatch, waitingRequests, sentRequests }) => {
    const [searchedPerson, setSearchedPerson] = useState();

    useEffect(() => {
        dispatch(getPendingFriends())
    }, [])

    const handleChangedSearch = async (e) => {
        if (e.target.value.length > 1) {
            var res = await dispatch(searchIfExists(e.target.value))
            console.log(res)
            if (res) {
                if (res.email) {
                    setSearchedPerson(res)
                    console.log(res)
                }
                else {
                    setSearchedPerson()
                }
            }
            else {
                setSearchedPerson()
            }
        }

    }

    const handleAddFriend = async () => {
        var res = await dispatch(sendRequest(searchedPerson.id))
        console.log(res)
    }

    return (
        <div className="friend-search">
            <input
                onChange={handleChangedSearch}
                placeholder="search for your friends ..."
            />
            {searchedPerson &&
                <div className="suggest-person">
                    <div>
                        <div className="suggest-person__name">{searchedPerson.firstName} {searchedPerson.lastName}</div>
                        <div className="suggest-person__email">{searchedPerson.email}</div>
                    </div>
                    {searchedPerson.email && <button className="but" onClick={handleAddFriend}>Add</button>}
                </div>
            }
            {
                waitingRequests.map((request) => {
                    return (
                        <AcceptDeclineItem key={request.id} request={request} />
                    )
                })
            }
            {
                sentRequests.map((req) => {
                    return (
                        <AcceptDeclineItem key={req} request={req} />
                    )
                })
            }


        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        waitingRequests: state.friends.waitingRequests,
        sentRequests: state.friends.sentRequests
    }
}

export default connect(mapStateToProps)(FriendPendingActivity)

