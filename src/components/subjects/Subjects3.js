import React, { useState, useEffect } from 'react'
import ListSubjects from './SubjectList/ListSubjects'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import SubjectDisplay from './SubjectDisplay/SubjectDisplayMain'
import CustomOverlay from '../../components/CustomOverlay'
import { loadSubjectBreakdown } from '../../thunks/chartThunk'
import { refreshUser } from '../../thunks/profileThunk'
import AddSubjectModalContent from './AddSubject/AddSubjectModalContent'
import EditSubject from './EditSubject/EditSubject'
import Modal from 'react-modal';
// joyride imports
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import { turnOffSubjectTour } from '../../thunks/profileThunk'
import { modifyProfile } from '../../actions/profileActions'
import { useHistory } from 'react-router-dom'
import addModalStyles from '../shared/AddModalStyles'
//import modalStyles from '../shared / ModalStyles'
import modalStylesCompressed from '../shared/ModalStylesCompressed'
import { realoadClassesThunk } from '../../thunks/subjectThunk'

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
        minWidth: '300px'
    }
};

const TOUR_STEPS = [
    // {
    //     target: "#addButton",
    //     content: 'First, add all of your subjects for this semester.',
    //     disableBeacon: true,
    //     disableOverlay: true
    // },
    // {
    //     target: "#tasks",
    //     content:
    //         "Next let's head over to tasks...",
    //     locale: {
    //         last: 'Next'
    //     },
    //     disableOverlay: true
    // },
];

const Subjects3 = ({ width, subjects = [], dispatch, currentSubject, profile }) => {
    // controls the display of the view on the right
    const [addSubjectOpen, setAddSubjectOpen] = useState(false)
    const [displayMode, setDisplayMode] = useState('')

    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);

    // load new pie chart data every time current subject is changed
    useEffect(() => {
        dispatch(loadSubjectBreakdown(currentSubject.id))
    }, [currentSubject])

    useEffect(() => {
        dispatch(realoadClassesThunk())
        dispatch(refreshUser())

        const action = urlParams.get('action')

        if (action === 'openAddSubj') {
            openAddModal()
        }

    }, [])

    const turnOnEditing = () => setDisplayMode('editing')

    const closeAddModal = () => {
        setAddSubjectOpen(false)
    }
    const openAddModal = () => {
        setAddSubjectOpen(true)
    }

    const renderDisplay = () => {
        if (displayMode === 'editing') {
            return (<EditSubject setDisplayMode={setDisplayMode} />)
        }
        else if (displayMode === 'adding') {
            return (
                <div className="innerDisplay">
                    <AddSubjectModalContent closeAddModal={closeAddModal} />
                </div>
            )
        }
        else if (displayMode === 'display') {
            return (<SubjectDisplay setDisplayMode={setDisplayMode} turnOnEditing={turnOnEditing} />)
        }
        else if (subjects.length === 0) {
            return (<CustomOverlay message="Add a subject to get started" />)
        }
        else {
            return (<div></div>)
        }
    }

    const history = useHistory()

    return (
        <Row className="subjects" style={(width < 1000) ? { paddingRight: '0px' } : {
            border: '0px solid blue', paddingRight: '300px'
        }}>
            <Modal
                isOpen={addSubjectOpen}
                onRequestClose={closeAddModal}
                style={width > 999 ? addModalStyles : modalStylesCompressed}
                contentLabel="Add Subject Modal"
            >
                <AddSubjectModalContent closeAddModal={closeAddModal} />
            </Modal>
            <Col style={{ padding: '0px', backgroundColor: '#f9f9f9' }} xs={12} s={12} md={12} lg={12} className="scroller main-left">
                <ListSubjects setDisplayMode={setDisplayMode} openAddModal={openAddModal} />
            </Col>
            { false && <Col style={{ padding: '0px' }} xs={12} s={12} md={6} lg={6} className="display">
                {renderDisplay()}
            </Col>}
        </Row>
    )
}

const mapStateToProps = (state) => {
    return {
        width: state.width,
        subjects: state.subjects,
        currentSubject: state.currentSubject,
        profile: state.profile
    }
}

export default connect(mapStateToProps)(Subjects3)