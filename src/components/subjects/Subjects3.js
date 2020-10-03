import React, { useState, useEffect } from 'react'
import ListSubjects from './SubjectList/ListSubjects'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import SubjectDisplay from './SubjectDisplay/SubjectDisplayMain'
import CustomOverlay from '../../components/CustomOverlay'
import { loadSubjectBreakdown } from '../../thunks/chartThunk'
import AddSubjectModalContent from './AddSubject/AddSubjectModalContent'
import EditSubject from './EditSubject/EditSubject'
import Modal from 'react-modal';


const customStyles = {
    content: {
        top: '50%',
        left: '40%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        background: '#ffffff',
        padding: 'none',
        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
        minWidth: '500px'
    }
};

const Subjects3 = ({ width, subjects = [], dispatch, currentSubject }) => {
    // controls the display of the view on the right
    const [displayMode, setDisplayMode] = useState('')

    // load new pie chart data every time current subject is changed
    useEffect(() => {
        dispatch(loadSubjectBreakdown(currentSubject.id))
    }, [currentSubject])

    const turnOnEditing = () => setDisplayMode('editing')

    const closeAddModal = () => {
        if (currentSubject?.id) {
            setDisplayMode('display')
        }
        else {
            setDisplayMode('')
        }
    }

    const renderDisplay = () => {
        if (displayMode === 'editing') {
            return (<EditSubject setDisplayMode={setDisplayMode} />)
        }
        else if (displayMode === 'adding') {
            return (<Modal
                isOpen={displayMode === 'adding'}
                onRequestClose={closeAddModal}
                style={customStyles}
                contentLabel="Add Subject Modal"
            >
                <AddSubjectModalContent closeAddModal={closeAddModal} />
            </Modal>)
        }
        else if (displayMode === 'display') {
            return (<SubjectDisplay turnOnEditing={turnOnEditing} />)
        }
        else if (subjects.length === 0) {
            return (<CustomOverlay message="Add a subject to get started" />)
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
        subjects: state.subjects,
        currentSubject: state.currentSubject
    }
}

export default connect(mapStateToProps)(Subjects3)