import React, { useEffect, useState } from 'react'
import axios from 'axios'
import url from '../environment/url'
import { connect } from 'react-redux'
import { fillTasks } from '../actions/taskActions'
import TaskList from './TaskList'
import AddTask from './AddTask'
import TaskDisplay from './TaskDisplay'
import TaskEdit from './TaskEdit'
import { Row, Col } from 'react-bootstrap'



var currentTaskCopy = {}

const TasksPage = (props) => {
    const [currentTask, setCurrentTask] = useState({})
    const [isAddingTask, setIsAddingTask] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const getClassColor = (subjectId) => {
        const subj = props.subjects.find((subject) => subject.id === subjectId)

        if (subj) {
            return(subj.color)
        }
        else {
            return(undefined)
        }
    }

    const getClassName = (subjectId) => {
        console.log(subjectId)
        const subj = props.subjects.find((subject) => subject.id === subjectId)
        if (subj) {
            return(subj.name + " " + subj.classCode)
        }
        else {
            return("no class found")
        }
    }

    const turnOnEditing = () => {
        currentTaskCopy = currentTask
        setCurrentTask({})
        setIsEditing(true)
    }

    const turnOnAdding = () => {
        setIsAddingTask(true)
        setIsEditing(false)
    }
    
    const turnOffAdding = () => {
        setIsAddingTask(false)
    }

    const loadTasks = async () => {
        try {
            console.log('getting tasks')
            const res = await axios.post(url + '/api/tasks/list',
                {
                    UserId: props.id
                }, {
                headers: {
                    'Authorization': 'bearer ' + props.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })

            if (res.status === 200) {
                props.dispatch(fillTasks(res.data))
            }

        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        console.log('loading')
        loadTasks()
    }, [])
    return (
        <Row className="tasks">
            <Col className="scroller">
                <TaskList 
                currentTask={currentTask}
                setCurrentTask={setCurrentTask} 
                tasks={props.tasks} 
                turnOnAdding={turnOnAdding} 
                setIsAddingTask={setIsAddingTask}
                setCurrentT={setCurrentTask}
                setIsEditing={setIsEditing}
                />
            </Col>
            <Col className="main-right">
            { isAddingTask && <AddTask loadTasks={loadTasks} turnOffAdding={turnOffAdding} /> }
            { currentTask.id && <TaskDisplay
                getClassName={getClassName} 
                getClassColor={getClassColor} 
                task={currentTask} turnOnEditing={turnOnEditing} />}
            { isEditing && <TaskEdit
                getClassColor={getClassColor} 
                currentTaskCopy={currentTaskCopy} 
                loadTasks={loadTasks}
                setCurrentTask={setCurrentTask}
                setIsEditing={setIsEditing} 
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
        subjects: state.subjects
    }
}


export default connect(mapStateToProps)(TasksPage)