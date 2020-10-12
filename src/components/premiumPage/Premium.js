import React from 'react'
import { connect } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Top5Tasks from './charts/Top5Tasks'

const Premium = ({ email, width }) => {
    const history = useHistory()
    const handleNavigateToDetailed = () => {
        history.push('/premium/detailed')
    }

    if (email === 'akaufman2000@gmail.com' || email === 'alexference23@gmail.com') {
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
                        <Col className="boxCol" md={6}>
                            <div className="innerBoxCol">
                                <Top5Tasks />
                            </div>
                        </Col>
                        <Col className="boxCol" md={6}>
                            <div className="innerBoxCol">
                                asdf
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="boxCol" id="quickT" md={6}>
                            <div className="innerBoxCol">
                                <div className="timerControl">
                                    Component
                                </div>
                            </div>
                        </Col>
                        <Col className="boxCol" md={6} >
                            <div className="innerBoxCol">
                                Component
                            </div>

                        </Col>
                    </Row>
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