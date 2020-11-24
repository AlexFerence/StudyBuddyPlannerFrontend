import React from 'react'
//import AddSubject from '../subjects/AddSubject/AddSubjectModalContent'
import SuggestedFriends from '../premiumPage/charts/SuggestedFriends'
import SignupThirdContent from './components/SignupThridContent'
import SignUpTopBar from '../shared/SignUpTopBar'

const SignupThird = () => {
    return (
        <React.Fragment>
            <SignUpTopBar />
            <div style={{ marginTop: '5px' }} className="container SignUpSecond">
                <SignupThirdContent />
            </div>
        </React.Fragment>
    )
}

export default SignupThird