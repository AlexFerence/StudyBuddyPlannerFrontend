import React, { useEffect } from 'react'
import axios from 'axios'
import url from '../environment/url'
import { connect } from 'react-redux'
import { fillTasks } from '../actions/taskActions'

const TasksPage = (props) => {

    


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
            <div className="main-left">
                {
                    props.tasks.map((t) => (
                        <p>{t.description}</p>
                    ))
                }
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