import React, { useEffect, useState } from 'react'
import axios from 'axios'
import url from '../environment/url'
import { connect } from 'react-redux'
import { fillTasks } from '../actions/taskActions'
import TaskList from './TaskList'
import AddTask from './AddTask'
import TaskDisplay from './TaskDisplay'

const TasksPage = (props) => {
    const [currentTask, setCurrentTask] = useState({})
    const [isAddingTask, setIsAddingTask] = useState(false)

    const turnOnAdding = () => {
        setIsAddingTask(true)
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
        <div className="tasks">
            <div className="scroller">
                <TaskList 
                setCurrentTask={setCurrentTask} 
                tasks={props.tasks} 
                turnOnAdding={turnOnAdding} 
                setIsAddingTask={setIsAddingTask}
                setCurrentT={setCurrentTask}
                />
            </div>
            <div className="main-right">
            { isAddingTask && <AddTask loadTasks={loadTasks} turnOffAdding={turnOffAdding} /> }
            { currentTask.id && <TaskDisplay task={currentTask} />}
            </div>
        </div>
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