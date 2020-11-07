import React from 'react'
import AddSubject from '../subjects/AddSubject/AddSubjectModalContent'
import SuggestedFriends from '../premiumPage/charts/SuggestedFriends'

const SignupThird = () => {
    return (
        <div className="container SignUpSecond">
            <label className="inpLabel">Add Your First Subject</label>
            <AddSubject />
            <label className="inpLabel">Add Friends</label>
            <SuggestedFriends />
        </div>
    )
}

export default SignupThird