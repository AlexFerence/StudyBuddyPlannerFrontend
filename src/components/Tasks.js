import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import TaskList from './TaskList'
import AddTask from './AddTask'
import TaskDisplay from './TaskDisplay'
import TaskEdit from './TaskEdit'
import { Row, Col } from 'react-bootstrap'
import { loadTasks } from '../thunks/taskThunk'
import { setCurrentTask } from '../actions/currentTaskActions'
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import { modifyProfile } from '../actions/profileActions'
import { turnOffTaskTour } from '../thunks/profileThunk'

const TOUR_STEPS = [
    {
        target: ".addTaskButton",
        content: 'Here, you can add all of your tasks.',
        disableBeacon: true,
        disableOverlay: true
    },
    {
        target: ".selectClass",
        content:
          "You can filter by due date and subject. Or, ",
        locale: {
            last: 'Next'
        }
    },
    {
        target: ".completedLabel",
        content:
          "filter by completed and non completed tasks.",
        locale: {
            last: 'Next'
        }
    },
    {
        target: "#dashboard",
        content:
          "Next, let's explore the dashboard...",
          locale: {
            last: 'Next'
          },
          disableBeacon: true,
      },
      

  ];


const TasksPage = ({ subjects, currentTask, dispatch, history, profile }) => {
    const [displayType, setDisplayType] = useState('')
    
    var [steps, setSteps] = useState(TOUR_STEPS)
    var [stepIndex, setStepIndex] = useState(0)
    var [run, setRun] = useState(true);

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
    }, [])

    const handleJoyrideCallback = data => {
        const { action, index, status, type } = data;

        console.log(STATUS);
    
        if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
          // Update state to advance the tour
          setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1))
        }
        else if ([STATUS.FINISHED, STATUS.PAUSED ,STATUS.SKIPPED].includes(status)) {
          // Need to set our running state to false, so we can restart if we click start again.
          setRun(false)

          console.log('doneasdfasdfasdfasdfasdfasfasdfasdfa')
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
        <Row className="tasks">
            <Joyride steps={TOUR_STEPS} 
            callback={handleJoyrideCallback}
            continuous={true} showSkipButton={true}
            run={profile.taskTour === 0}
            />
            <Col className="scroller">
                <TaskList
                displayOn={displayOn}
                addingOn={addingOn}
                />
            </Col>
            <Col className="main-right">
            {displayType === 'adding' && <AddTask 
                displayOn={displayOn}
                setDisplayType={setDisplayType}
                /> }
            { displayType === 'display' && <TaskDisplay
                editingOn={editingOn}
                displayOn={displayOn} 
                blankOn={blankOn}
                />}
            { displayType === 'editing' && <TaskEdit
                displayOn={displayOn}
                currentTaskCopy={currentTask}

                //currentTaskCopy={currentTaskCopy} 
                //loadTasks={loadTasks}
                //setCurrentTask={setCurrentTask}
                //setIsEditing={setIsEditing} 
                />}
            </Col>
        </Row>
    )
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        token: state.profile.token,
        id: state.profile.id,
        subjects: state.subjects,
        currentTask: state.currentTask,
        profile: state.profile
    }
}


export default connect(mapStateToProps)(TasksPage)