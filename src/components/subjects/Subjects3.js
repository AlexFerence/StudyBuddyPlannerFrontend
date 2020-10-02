import React from 'react'
import ListSubjects from './SubjectList/ListSubjects'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'


const Subjects3 = ({ width }) => {

    return (
        <Row className="subjects" style={(width < 1000) ? { paddingRight: '0px' } : {
            border: '0px solid blue', paddingRight: '300px'
        }}>
            <Col style={{ padding: '0px' }} xs={12} s={12} md={6} lg={6} className="scroller main-left">
                <ListSubjects />
            </Col>
            <Col style={{ padding: '0px' }} xs={12} s={12} md={6} lg={6} className="display">
            </Col>
        </Row>
    )
}

const mapStateToProps = (state) => {
    return {
        width: state.width
    }
}

export default connect(mapStateToProps)(Subjects3)