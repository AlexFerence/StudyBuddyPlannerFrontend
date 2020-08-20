import React, { useState } from 'react';
import { connect } from 'react-redux'
import { searchIfExists, sendRequest } from '../thunks/friendThunk'

const FriendPendingActivity = ({ dispatch }) => {
    const [searchedPerson, setSearchedPerson] = useState({});

    const handleChangedSearch = async (e) => {
        var res = await dispatch(searchIfExists(e.target.value))
        console.log(res)
        if (res) {
            if (res.email) {
                setSearchedPerson(res)
            }
            else {
                setSearchedPerson()
            }
        }
        else {
            setSearchedPerson()
        }
    }

    const handleAddFriend = async () => {
        var res = await dispatch(sendRequest(searchedPerson.id))
        console.log(res)
    }

    return (
        <div className="friendActivity">
            <input onChange={handleChangedSearch} />
            {searchedPerson && <div>{searchedPerson.email} <button onClick={handleAddFriend}>Add</button></div>}
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        charts: state.charts,
    }
}

export default connect()(FriendPendingActivity)