import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import DetailedView from './components/DetailedViewList'

const PremiumDetailed = ({ width, email }) => {

    if (email === 'akaufman2000@gmail.com'
        || email === 'alexference23@gmail.com'
        || email === 'vladstets18@gmail.com'
        || email === 'maddy.eppsconn@gmail.com'
    ) {
        return (
            <div className="dashboard" style={(width < 1000) ?
                { paddingRight: '0px' } : { paddingRight: '300px' }} >
                <Row>
                    <Col onClick={() => console.log('redirect')} className="boxCol" id="quickT" md={12}>
                        <div style={{ padding: '0px', margin: '0px', width: '100%' }}>
                            <DetailedView />
                        </div>
                    </Col>
                </Row>
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

export default connect(mapStateToProps)(PremiumDetailed)