import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { searchIfExists, sendRequest, searchUsers, getPendingFriends } from '../../thunks/friendThunk'
import Spinner from '../shared/Spinner'
import AcceptDeclineItem from './FriendPendinSearchItem'
import useDebounce from '../shared/use-debounce'

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

    const handleAddFriend = async (searchedId) => {

        var res = await dispatch(sendRequest(searchedId))

        if (res === 415) {
            setAddingError('Friend Already Added')
        }
        else {
            setSearchedPeople('')
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
            { searchedPeople && searchedPeople.map((person) => {
                return (
                    <div key={person.id} className="suggest-person">
                        <div>
                            <div className="suggest-person__name">{person.firstName} {person.lastName}</div>
                            <div className="suggest-person__email">{person.email}</div>
                            {addingError && <div className="suggest-person__name" style={{ fontSize: '12px', color: 'red' }}>{addingError}</div>}
                        </div>
                        {person.email &&
                            spinning ?
                            <Spinner />
                            :
                            <button className="but" onClick={() => handleAddFriend(person.id)}>
                                Add
                            </button>
                        }
                    </div>
                )

            })
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