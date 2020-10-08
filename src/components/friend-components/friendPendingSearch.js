import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { searchIfExists, sendRequest, searchUsers, getPendingFriends } from '../../thunks/friendThunk'
import {
    declineRequest, getAlreadyFriends, getAlreadyPending, isMe,
    getFriendsActiveFriends, getActiveFriends
} from '../../thunks/friendThunk'
import Spinner from '../shared/Spinner'
import AcceptDeclineItem from './FriendPendinSearchItem'
import useDebounce from '../shared/use-debounce'
import { IoMdPerson, IoMdCheckmark } from 'react-icons/io'
import { modifyFriends } from '../../actions/friendActions'

const FriendPendingActivity = ({ dispatch, waitingRequests, sentRequests }) => {
    const [searchedPersonInput, setSearchedPersonInput] = useState()
    const [searchedPeople, setSearchedPeople] = useState([]);
    const [addingError, setAddingError] = useState();
    const [spinning, setSpinning] = useState(false)

    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        dispatch(getPendingFriends())
    }, [])

    const debouncedSearchTerm = useDebounce(searchedPersonInput, 600);
    useEffect(
        () => {
            // Make sure we have a value (user has entered something in input)
            if (debouncedSearchTerm) {
                // Set isSearching state
                setIsSearching(true);
                // Fire off our API call
                console.log(debouncedSearchTerm)
                dispatch(searchUsers(debouncedSearchTerm)).then((res) => {
                    console.log(res)
                    setSearchedPeople(res)
                    setIsSearching(false);
                })
                console.log('searched')

            } else {
                setSearchedPeople('')
            }
        },
        [debouncedSearchTerm]
    );

    const handleChangedSearch = (e) => {
        setSearchedPersonInput(e.target.value)
    }

    const addFriend = async (friend) => {
        setSpinning(true)
        const t = await dispatch(sendRequest(friend.id))
        const u = t + await dispatch(getActiveFriends())
        //const v = u + await dispatch(modifyFriends({ selectedFriend }))
        const w = u + await dispatch(getFriendsActiveFriends())
        const x = w + setSpinning(false)
    }


    const handleAddFriend = async (searchedId) => {
        var res = await dispatch(sendRequest(searchedId))

        if (res === 415) {
            setAddingError('Friend Already Added')
        }
        else {
            setSearchedPeople('')
        }
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
                <div id="but-add-friend" onClick={() => addFriend(friend)} className="friend-modal-friend-list-item__add-button">
                    + Add
                </div>
            </React.Fragment>
        )

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
            <div>
                {searchedPeople && searchedPeople.map((person) => {
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

                })
                }
            </div>
            {waitingRequests?.length > 0 &&
                <div style={{ marginTop: '15px', marginBottom: '5px' }}>Waiting Requests</div>}

            {
                waitingRequests.map((request) => {
                    key++
                    return (
                        <AcceptDeclineItem key={key} request={request} />
                    )
                })
            }
            {sentRequests?.length > 0 &&
                <div style={{ marginTop: '15px', marginBottom: '5px' }}>Sent Requests</div>
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

  // const handleChangedSearch = async (e) => {
    //     setAddingError()
    //     if (e.target.value.length > 10) {
    //         var res = await dispatch(searchIfExists(e.target.value))
    //         console.log(res)
    //         if (res) {
    //             if (res.email) {
    //                 setSearchedPerson(res)
    //                 console.log(res)
    //             }
    //             else {
    //                 setSearchedPerson()
    //             }
    //         }
    //         else {
    //             setSearchedPerson()
    //         }
    //     }

    // }