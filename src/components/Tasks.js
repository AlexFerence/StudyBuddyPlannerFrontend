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



const TOUR_STEPS = [
    {
        target: ".addTaskButton",
        content: 'Add your tasks here',
        disableBeacon: true,
    },
    {
        target: ".selectClass",
        content:
          "Filter your tasks by due date or subject",
        locale: {
            last: 'Next'
        }
    },
    {
        target: ".completedLabel",
        content:
          "filter by completed and non completed tasks",
        locale: {
            last: 'Next'
        }
    },
    {
        target: "#dashboard",
        content:
          "Next lets explore the dashboard",
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
    
        if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
          // Update state to advance the tour
          setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1))
        }
        else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
          // Need to set our running state to false, so we can restart if we click start again.
          setRun(false)

          console.log('doneasdfasdfasdfasdfasdfasfasdfasdfa')
          history.push("/dashboard")
          dispatch(modifyProfile({ taskTour: false }))
        }
    
        console.groupCollapsed(type);
        console.log(data); //eslint-disable-line no-console
        console.groupEnd();
    };


    return (
        <Row className="tasks">
            <Joyride steps={TOUR_STEPS} 
            callback={handleJoyrideCallback}
            continuous={true} showSkipButton={false}
            run={profile.taskTour}
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