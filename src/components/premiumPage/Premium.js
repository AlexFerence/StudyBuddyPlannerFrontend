import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import TopDays from './charts/TopDays'
import TopAssignments from './charts/TopAssignments'
import FriendStreaks from './charts/FriendsStreaks'
import {
    loadTop5Assignments, loadTop5Days,
    loadTop5AssignmentsFriends,
    loadTop5DaysFriends
} from '../../thunks/premiumStatsThunk'
import GithubCalendar from './charts/GithubCalendar'
import SuggestedFriends from './charts/SuggestedFriends'
import FeedList from './feed/FeedList'
import { FiArrowRight } from 'react-icons/fi'
import { loadDetailedView } from '../../thunks/premiumStatsThunk'

import { refreshFeed } from '../../thunks/feedThunk'

const Premium = ({ email, width, dispatch }) => {
    const history = useHistory()
    const handleNavigateToDetailed = () => {
        history.push('/premium/detailed')
    }

    useEffect(() => {
        dispatch(loadTop5Days())
        dispatch(loadTop5Assignments())
        dispatch(loadTop5AssignmentsFriends())
        dispatch(loadTop5DaysFriends())
        dispatch(refreshFeed())
    }, [])

    const goToDetailed = () => {
        dispatch(loadDetailedView())
        history.push('/premium/detailed')
    }

    if (
        email === 'akaufman2000@gmail.com'
        || email === 'alexference23@gmail.com'
        || email === 'vladstets18@gmail.com'
        || email === 'maddy.eppsconn@gmail.com'
        || email === 'sayeed.mavani@gmail.com'
    ) {
        return (
            <div className="premium" style={(width < 1000) ?
                { paddingRight: '0px' } : { paddingRight: '300px' }} >
                <div className="premium-col">
                    <FeedList />
                </div>
                <div className="premium-col">
                    <Col className="boxCol" md={12} >
                        <div className="innerBoxCol dash-button" onClick={goToDetailed}>
                            Completed Tasks
                        <FiArrowRight style={{ marginLeft: '5px' }} />
                        </div>
                    </Col>
                    <Col className="boxCol" id="quickT" md={12}>
                        <div className="innerBoxCol">
                            <GithubCalendar />
                        </div>
                    </Col>
                    <Col className="boxCol" id="quickT" md={12}>
                        <div className="innerBoxCol">
                            <TopAssignments />
                        </div>
                    </Col>
                    <Col className="boxCol" id="quickT" md={12}>
                        <div className="innerBoxCol">
                            <SuggestedFriends />
                        </div>
                    </Col>
                    <Col className="boxCol" id="quickT" md={12}>
                        <div className="innerBoxCol">
                            <TopDays />
                        </div>
                    </Col>
                    <Col className="boxCol" id="quickT" md={12}>
                        <div className="innerBoxCol">
                            <FriendStreaks />
                        </div>
                    </Col>
                </div>
            </div>
        )
    }
    else {
        return (
            <Redirect to="/dashboard" />
        )
    }

}

const mapStateToProps = (state) => {
    return {
        charts: state.charts,
        profile: state.profile,
        subjects: state.subjects,
        stripeStatus: state.profile.userBilling.stripeStatus,
        tasks: state.tasks,
        width: state.width,
        email: state.profile.email,
    }
}


export default connect(mapStateToProps)(Premium)


//     < div div className = "rows" >
// <Row>
//     <Col className="BoxCol"
//         style={{ padding: '10px' }}
//         md={12}>
//         <div className="innerBoxCol">
//             <GithubCalendar />
//         </div>
//     </Col>
// </Row>
// <Row>
//     <Col className="boxCol" md={6}>
//         <div className="innerBoxCol">
//             <Top5Assignments />
//         </div>
//     </Col>
//     <Col className="boxCol" md={6}>
//         <div className="innerBoxCol">
//             <Top5Days />
//         </div>
//     </Col>
// </Row>
// <Row>
//     <Col className="boxCol" id="quickT" md={6}>
//         <div className="innerBoxCol">
//             <div className="timerControl">
//                 <FriendsTop5Assignments />
//             </div>
//         </div>
//     </Col>

// </ >
