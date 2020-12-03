import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import TaskList from './tasks/TaskList'
import AddTask from './AddTask'
import TaskDisplay from './TaskDisplay'
import TaskEdit from './TaskEdit'
import CustomOverlay from './CustomOverlay'
import CustomChildrenOverlay from './CustomChildrenOverlay'
import { Row, Col } from 'react-bootstrap'
import { loadTasks, setCurrentTaskById } from '../thunks/taskThunk'
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import { modifyProfile } from '../actions/profileActions'
import { turnOffTaskTour, refreshUser } from '../thunks/profileThunk'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { logout } from '../actions/profileActions'
import { useHistory } from 'react-router-dom'
import { getActiveFriends, getPendingFriends } from '../thunks/friendThunk'



const TOUR_STEPS = [
    // {
    //     target: ".addTaskButton",
    //     content: 'Add a task here',
    //     disableBeacon: true,
    //     disableOverlay: true
    // },
    // {
    //     target: ".selectClass",
    //     content:
    //         "Filter by due date and subject",
    //     locale: {
    //         last: 'Next'
    //     },
    //     disableOverlay: true
    // },
    // {
    //     target: ".completedLabel",
    //     content:
    //         "Filter by completed and non completed tasks.",
    //     locale: {
    //         last: 'Next'
    //     },
    //     disableOverlay: true
    // },
    // {
    //     target: "#dashboard",
    //     content:
    //         "Next, let's explore the dashboard...",
    //     locale: {
    //         last: 'Next'
    //     },
    //     disableBeacon: true,
    //     disableOverlay: true
    // },


];


const TasksPage = ({ subjects, currentTask, dispatch, profile, width, tasks }) => {
    const [displayType, setDisplayType] = useState('')

    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);

    const history = useHistory()

    const nothingOn = () => {
        setDisplayType('')
    }

    const addingOn = () => {
        setDisplayType('adding')
    }

    const editingOn = () => {
        setDisplayType('editing')
    }

    const displayOn = () => {
        setDisplayType('display')
    }

    const blankOn = () => {
        setDisplayType('')
    }

    useEffect(() => {
        dispatch(loadTasks())
        //dispatch(setCurrentTaskById(currentTask.id))

        // dispatch(refreshUser()).then(() => {
        //     if (moment().isAfter(moment(profile.tokenExpiry))) {
        //         dispatch(logout())
        //         history.push('/')
        //     }
        // })

        dispatch(getActiveFriends())
        dispatch(getPendingFriends())

        if (urlParams.get('action') === 'openAddTask') {
            addingOn()
        }

        else if (currentTask.id && currentTask.subjectId && tasks.length > 0) {
            setDisplayType('display')
        }

    }, [])

    const handleGoToSubjects = () => {
        history.push('/subjects?action=openAddSubj')
    }

    return (
        <div>
            <Row className="tasks" style={(width < 1000) ? {
                paddingRight: '0px'
            } : {
                    border:
                        '0px solid blue',
                    paddingRight: '300px'
                }}>
                <Col
                    style={{ padding: '0px' }}
                    xs={12} s={12} md={6} lg={6} className="scroller" s={6}>
                    <TaskList
                        displayOn={displayOn}
                        addingOn={addingOn}
                        nothingOn={nothingOn}
                        blankOn={blankOn}
                    />
                </Col>
                <Col xs={12} s={12} md={6} lg={6} style={{ overflow: 'hidden' }} className="main-right">
                    {displayType === 'adding' && <AddTask
                        displayOn={displayOn}
                        setDisplayType={setDisplayType}
                    />}
                    {displayType === 'display' && <TaskDisplay
                        editingOn={editingOn}
                        displayOn={displayOn}
                        blankOn={blankOn}
                    />}
                    {displayType === 'editing' && <TaskEdit
                        displayOn={displayOn}
                        currentTaskCopy={currentTask}
                    />}
                    {displayType === '' && subjects.length === 0 &&
                        <CustomChildrenOverlay>
                            <div style={{ color: 'black' }}>Before you can add a task</div>
                            <button id='bigAddButton'
                                style={{ marginTop: '20px' }}
                                onClick={handleGoToSubjects}
                            >+ Add Subject</button>
                        </CustomChildrenOverlay>
                    }
                    {
                        displayType === '' && subjects.length > 0 && tasks.length === 0 &&
                        <CustomChildrenOverlay>
                            <button id='bigAddButton'
                                onClick={addingOn}
                            >+ Add Task</button>
                        </CustomChildrenOverlay>
                    }

                </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        token: state.profile.token,
        id: state.profile.id,
        subjects: state.subjects,
        currentTask: state.currentTask,
        profile: state.profile,
        width: state.width,
        tasks: state.tasks
    }
}

export default connect(mapStateToProps)(TasksPage)
