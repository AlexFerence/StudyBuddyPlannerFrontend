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
    const [displayType, setDisplayType] = useState('')

    const addingOn = () => {
        setDisplayType('adding')
    }

    const editingOn = () => {
        setDisplayType('editing')
    }
    
    const displayOn = () => {
        setDisplayType('display')
    }
    
    useEffect(() => {
        dispatch(loadTasks())

    }, [])

    return (
        <Row className="tasks">
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
        currentTask: state.currentTask
    }
}


export default connect(mapStateToProps)(TasksPage)