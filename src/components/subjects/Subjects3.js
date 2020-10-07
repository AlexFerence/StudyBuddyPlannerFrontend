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
    {
        target: "#addButton",
        content: 'First, add all of your subjects for this semester.',
        disableBeacon: true,
        disableOverlay: true
    },
    {
        target: "#tasks",
        content:
            "Next let's head over to tasks...",
        locale: {
            last: 'Next'
        },
        disableOverlay: true
    },


];



const Subjects3 = ({ width, subjects = [], dispatch, currentSubject, profile }) => {
    // controls the display of the view on the right
    const [displayMode, setDisplayMode] = useState('')
    var [run, setRun] = useState(true);
    var [stepIndex, setStepIndex] = useState(0)

    // load new pie chart data every time current subject is changed
    useEffect(() => {
        dispatch(loadSubjectBreakdown(currentSubject.id))

    }, [currentSubject])

    useEffect(() => {
        dispatch(refreshUser())
    }, [])

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
                style={width > 999 ? addModalStyles : modalStylesCompressed}
                contentLabel="Add Subject Modal"
            >
                <AddSubjectModalContent closeAddModal={closeAddModal} />
            </Modal>)
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

    const handleJoyrideCallback = data => {
        const { action, index, status, type } = data;
        if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
            // Update state to advance the tour
            setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1))
        }
        else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            // Need to set our running state to false, so we can restart if we click start again.
            setRun(false)

            history.push("/tasks")
            //turn off tour locally
            dispatch(modifyProfile({ subjectTour: 1 }))
            //turn off in server
            dispatch(turnOffSubjectTour())
        }
    };

    return (
        <Row className="subjects" style={(width < 1000) ? { paddingRight: '0px' } : {
            border: '0px solid blue', paddingRight: '300px'
        }}>
            <Joyride steps={TOUR_STEPS}
                continuous={true} showSkipButton={true}
                callback={handleJoyrideCallback}
                run={profile.subjectTour === 0}
                styles={{
                    options: {
                        primaryColor: '#fb4033'
                    },
                    buttonClose: {
                        display: 'none',
                    },
                }}
            />
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
        currentSubject: state.currentSubject,
        profile: state.profile
    }
}

export default connect(mapStateToProps)(Subjects3)