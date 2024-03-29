import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import FriendPendingSearch from './friendPendingSearch'
import FriendActiveList from './FriendActiveList'
import { IoMdAdd, IoMdClose } from 'react-icons/io';
import swal from 'sweetalert'
import useDebounce from '../shared/use-debounce'
import { searchIfExists, sendRequest, searchUsers, getPendingFriends } from '../../thunks/friendThunk'
import url from '../../environment/url';
//import FriendModal from './FriendModal'


const FriendActivity = ({ waitingRequests, dispatch, campaignCode }) => {

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


    const [activityShowing, setActivityShowing] = useState(true);

    const handleShowPending = () => {
        setActivityShowing(!activityShowing)
    }

    const copyToClipboard = () => {

        var copyURL = ''

        if (campaignCode) {
            copyURL = url + '/signup?code=' + campaignCode
        }
        else {
            copyURL = 'https://www.studybuddyplanner.com/'
        }

        navigator.clipboard.writeText(copyURL)
        swal({
            title: "Invite Link Copied to clipboard",
            text: copyURL,
            icon: "success",

            confirmButtonColor: '#fb4033',
            cancelButtonColor: '#fb4033',
        })
    }

    const plusOrX = () => {
        if (activityShowing) {
            return (
                <div className="plus-container">
                    <IoMdAdd />

                    {waitingRequests && waitingRequests.length > 0 && <div className="badge">{waitingRequests.length}</div>}
                </div>
            )
        }
        else {
            return (
                <IoMdClose />
            )
        }
    }

    return (
        <div className="friend-activity">
            <div className="friend-activity__header">
                <div className="friend-activity__header__title" >
                    Friend Activity
                </div>
                <div className="friend-activity__header__bell" onClick={handleShowPending}>
                    {plusOrX()}
                </div>
            </div>

            {activityShowing ? <FriendActiveList /> : <FriendPendingSearch />}
            <button className="invite-friends" onClick={copyToClipboard}>Invite Friends</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        waitingRequests: state.friends.waitingRequests,
        campaignCode: state.settings.campaignCode
    }
}

export default connect(mapStateToProps)(FriendActivity)