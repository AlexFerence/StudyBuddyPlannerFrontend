import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { searchIfExists, sendRequest, getPendingFriends } from '../../thunks/friendThunk'
import Spinner from '../shared/Spinner'
import AcceptDeclineItem from './FriendPendinSearchItem'
import swal from 'sweetalert';

const FriendPendingActivity = ({ dispatch, waitingRequests, sentRequests }) => {
    const [searchedPerson, setSearchedPerson] = useState();
    const [addingError, setAddingError] = useState();

    const [spinning, setSpinning] = useState(false)

    useEffect(() => {
        dispatch(getPendingFriends())
    }, [])

    const handleChangedSearch = async (e) => {
        setAddingError()
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
        if (res === 415) {
            setAddingError('Friend Already Added')

        }
        else {
            setSearchedPerson('')
        }
    }
    var key = 0

    return (
        <div className="friend-search">
            <div className="friend-search__input-container">
                <input className="friend-search__input"
                    onChange={handleChangedSearch}
                    placeholder="enter email of friends ..."
                />
            </div>
            {searchedPerson &&
                <div className="suggest-person">
                    <div>
                        <div className="suggest-person__name">{searchedPerson.firstName} {searchedPerson.lastName}</div>
                        <div className="suggest-person__email">{searchedPerson.email}</div>
                        {addingError && <div className="suggest-person__name" style={{ fontSize: '12px', color: 'red' }}>{addingError}</div>}
                    </div>
                    {searchedPerson.email &&
                        spinning ?
                        <Spinner />
                        :
                        <button className="but" onClick={handleAddFriend}>
                            Add
                        </button>
                    }
                </div>
            }
            {
                waitingRequests.map((request) => {
                    key++
                    return (
                        <AcceptDeclineItem key={key} request={request} />
                    )
                })
            }
            {
                sentRequests.map((req) => {
                    key++
                    return (
                        <AcceptDeclineItem key={key} request={req} />
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

