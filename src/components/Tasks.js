import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import TaskList from './TaskList'
import AddTask from './AddTask'
import TaskDisplay from './TaskDisplay'
import TaskEdit from './TaskEdit'
import { Row, Col } from 'react-bootstrap'
import { loadTasks } from '../thunks/taskThunk'
import { setCurrentTask } from '../actions/currentTaskActions'

const TasksPage = ({ subjects, currentTask, dispatch }) => {
    const [isAdding, setIsAdding] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const addingOn = () => {
        dispatch(setCurrentTask({}))
        setIsEditing(false)
        setIsAdding(true)
    }
    const addingOff = () => {
        setIsAdding(false)
    }

    // const turnOnEditing = () => {
    //     //currentTaskCopy = currentTask
    //     dispatch(setCurrentTask({}))
    //     setIsEditing(true)
    // }

    // const turnOnAdding = () => {
    //     setIsAddingTask(true)
    //     setIsEditing(false)
    // }
    
    // const turnOffAdding = () => {
    //     setIsAddingTask(false)
    // }

    
    useEffect(() => {
        loadTasks()
    }, [])

    return (
        <Row className="tasks">
            <Col className="scroller">
                <TaskList
                addingOn={addingOn}
                addingOff={addingOff}
                />
            </Col>
            <Col className="main-right">
            {isAdding && <AddTask 
                addingOff={addingOff}
                /> }
            { currentTask.id && <TaskDisplay
                //setCurrentTask={setCurrentTask}
                //getClassName={getClassName} 
                //getClassColor={getClassColor} 
                //task={currentTask} turnOnEditing={turnOnEditing} 
                />}
            { false && <TaskEdit

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
        currentTask: state.currentTask
    }
}


export default connect(mapStateToProps)(TasksPage)