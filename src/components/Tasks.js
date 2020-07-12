import React, { useEffect, useState } from 'react'
import axios from 'axios'
import url from '../environment/url'
import { connect } from 'react-redux'
import { fillTasks } from '../actions/taskActions'
import TaskList from './TaskList'
import TaskModal from './TaskModal'

const TasksPage = (props) => {

    const [isOpen, setIsOpen] = useState(false)

    const setOpenModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
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
            <TaskModal isOpen={isOpen} closeModal={closeModal} />
            <div className="scroller">
                <TaskList tasks={props.tasks} setOpenModal={setOpenModal} />
            </div>
            <div className="main-right">there</div>
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