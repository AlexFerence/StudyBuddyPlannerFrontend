import React, { useState } from 'react'
import ListSubjects from './SubjectList/ListSubjects'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'


const Subjects3 = ({ width, subjects = [] }) => {

    const [displayMode, setDisplayMode] = useState('')

    const renderDisplay = () => {
        if (displayMode === 'edit') {
            return (<div>Editing</div>)
        }
        else if (displayMode === 'adding') {
            return (<div>Adding</div>)
        }
        else if (displayMode === 'display') {
            return (<div>Display</div>)
        }
        else if (subjects.length === 0) {
            return (<div>Nothing</div>)
        }
        else {
            return (<div></div>)
        }
    }

    return (
        <Row className="subjects" style={(width < 1000) ? { paddingRight: '0px' } : {
            border: '0px solid blue', paddingRight: '300px'
        }}>
            <Col style={{ padding: '0px' }} xs={12} s={12} md={6} lg={6} className="scroller main-left">
                <ListSubjects setDisplayMode={setDisplayMode} />
            </Col>
            <Col style={{ padding: '0px' }} xs={12} s={12} md={6} lg={6} className="display">
                {renderDisplay()}
            </Col>
        </Row>
    )
}

const mapStateToProps = (state) => {
    return {
        width: state.width,
        subjects: state.subjects
    }
}

export default connect(mapStateToProps)(Subjects3)