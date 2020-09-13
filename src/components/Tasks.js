import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import TaskList from './TaskList'
import AddTask from './AddTask'
import TaskDisplay from './TaskDisplay'
import TaskEdit from './TaskEdit'
import CustomOverlay from './CustomOverlay'
import CustomChildrenOverlay from './CustomChildrenOverlay'
import { Row, Col } from 'react-bootstrap'
import { loadTasks } from '../thunks/taskThunk'
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import { modifyProfile } from '../actions/profileActions'
import { turnOffTaskTour, refreshUser } from '../thunks/profileThunk'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { logout } from '../actions/profileActions'
import { useHistory } from 'react-router-dom'


const TOUR_STEPS = [
    {
        target: ".addTaskButton",
        content: 'Add a task here',
        disableBeacon: true,
        disableOverlay: true
    },
    {
        target: ".selectClass",
        content:
            "Filter by due date and subject",
        locale: {
            last: 'Next'
        },
        disableOverlay: true
    },
    {
        target: ".completedLabel",
        content:
            "Filter by completed and non completed tasks.",
        locale: {
            last: 'Next'
        },
        disableOverlay: true
    },
    {
        target: "#dashboard",
        content:
            "Next, let's explore the dashboard...",
        locale: {
            last: 'Next'
        },
        disableBeacon: true,
        disableOverlay: true
    },


];


const TasksPage = ({ subjects, currentTask, dispatch, profile, width, tasks }) => {
    const [displayType, setDisplayType] = useState('')



    var [steps, setSteps] = useState(TOUR_STEPS)
    var [stepIndex, setStepIndex] = useState(0)
    var [run, setRun] = useState(true);

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

        dispatch(refreshUser()).then(() => {
            if (moment().isAfter(moment(profile.tokenExpiry))) {
                dispatch(logout())
                history.push('/')
            }
        })

        console.log(moment())
        console.log(moment(profile.tokenExpiry))
        if (moment().isAfter(moment(profile.tokenExpiry))) {
            console.log('SHOULD LOG OUT')
            dispatch(logout())
            history.push('/')

        }
    }, [])

    const handleJoyrideCallback = data => {
        const { action, index, status, type } = data;

        console.log(STATUS);

        if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
            // Update state to advance the tour
            setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1))
        }
        else if ([STATUS.FINISHED, STATUS.PAUSED, STATUS.SKIPPED].includes(status)) {
            // Need to set our running state to false, so we can restart if we click start again.
            setRun(false)
            history.push("/dashboard")
            //locally turn off the tour
            dispatch(modifyProfile({ taskTour: 1 }))
            //send back to server to turn off tour
            dispatch(turnOffTaskTour())


        }

        console.groupCollapsed(type);
        console.log(data); //eslint-disable-line no-console
        console.groupEnd();
    };


    return (
        <div>
            <Joyride steps={TOUR_STEPS}
                continuous={true} showSkipButton={true}
                callback={handleJoyrideCallback}
                run={profile.taskTour === 0}
                styles={{
                    options: {
                        primaryColor: '#fb4033'
                    },
                    buttonClose: {
                        display: 'none',
                    },

                }}
            />

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
                    />
                </Col>
                <Col xs={12} s={12} md={6} lg={6} className="main-right">
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
                            <Link to="/subjects" style={{
                                color: '#fb4033'
                            }}><div>Add a subject</div></Link>
                        </CustomChildrenOverlay>
                    }
                    {displayType === '' && subjects.length > 0 && tasks.length === 0 &&
                        <CustomOverlay message="Add a task to get started" />
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