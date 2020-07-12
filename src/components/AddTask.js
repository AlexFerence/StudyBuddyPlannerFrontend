import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

const TaskModal = ({ subjects, turnOffAdding }) => {

    const [currentSubjectID, setCurrentSubjectID] = useState('')
    const [taskType, setTaskType] = useState('')
    const [taskTitle, setTaskTitle] = useState('')
    const [taskDesc, setTaskDesc] = useState('')

    useEffect(() => {
        if (subjects[0]) {
            setCurrentSubjectID(subjects[0].id)
            setTaskType(subjects[0].taskTitle)
        }

    })

    const onSubmit = (e) => {
        e.preventDefault()

        console.log(currentSubjectID)
        console.log(taskTitle)
        console.log(taskType)

    }

    return (
        <div className="add-task">
            <div className="add-task-header">
                <span>Add Task</span>
                <div>
                    <button>edit</button><button>Delete</button>
                </div>
            </div>
            <div className="add-task-body">
                <form onSubmit={onSubmit}>
                    <div className="top-row">
                    </div>
                Class:
                <select onChange={(e) => setCurrentSubjectID(e.target.value) }>
                        {
                            subjects.map((subject) => {
                                return (<option value={subject.id} key={subject.id}>{subject.name} {subject.classCode}</option>)
                            })
                        }
                    </select>
                Type:
                <select onChange={(e) => setTaskType(e.target.value)}>
                        <option value="Assignment">Assignment</option>
                        <option value="Quiz">Quiz</option>
                        <option value="Test">Test</option>
                        <option value="Exam">Exam</option>
                    </select> <br />

                    <label>Title: </label><input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
                    <label>Description: </label><textarea />
                    <button type="submit">Submit</button>
                    <button onClick={(e) => {
                        e.preventDefault()
                        turnOffAdding()
                    }}>Cancel</button>
                </form>
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

export default connect(mapStateToProps)(TaskModal)