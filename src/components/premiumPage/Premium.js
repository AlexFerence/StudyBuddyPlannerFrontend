import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Top5Days from './charts/Top5Days'
import Top5Assignments from './charts/Top5Assignments'
import Top5AssignmentsFriends from './charts/FriendsTop5Assignments'
import {
    loadTop5Assignments, loadTop5Days,
    loadTop5AssignmentsFriends,
    loadTop5DaysFriends
} from '../../thunks/premiumStatsThunk'
import FriendsTop5Days from './charts/FriendsTop5Days'
import FriendsTop5Assignments from './charts/FriendsTop5Assignments'
import GithubCalendar from './charts/GithubCalendar'

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
    }, [])

    if (
        email === 'akaufman2000@gmail.com'
        || email === 'alexference23@gmail.com'
        || email === 'vladstets18@gmail.com'
        || email === 'maddy.eppsconn@gmail.com'
    ) {
        return (
            <div className="dashboard" style={(width < 1000) ?
                { paddingRight: '0px' } : { paddingRight: '300px' }} >
                <div className="rows">
                    <Row>
                        <Col onClick={handleNavigateToDetailed} className="boxCol" id="quickT" md={12}>
                            <div className="innerBoxCol detailed-view-button arrow-premium">
                                <span>Go to premium detailed view </span>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="BoxCol"
                            style={{ padding: '10px' }}
                            md={12}>
                            <div className="innerBoxCol">
                                <GithubCalendar />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="boxCol" md={6}>
                            <div className="innerBoxCol">
                                <Top5Assignments />
                            </div>
                        </Col>
                        <Col className="boxCol" md={6}>
                            <div className="innerBoxCol">
                                <Top5Days />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="boxCol" id="quickT" md={6}>
                            <div className="innerBoxCol">
                                <div className="timerControl">
                                    <FriendsTop5Assignments />
                                </div>
                            </div>
                        </Col>
                        <Col className="boxCol" md={6} >
                            <div className="innerBoxCol">
                                <FriendsTop5Days />
                            </div>

                        </Col>
                    </Row>
                </div>
            </div >
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