import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import url from '../environment/url'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css';

const AddTask = ({ subjects, turnOffAdding, loadTasks, token, id }) => {

    const [currentSubjectID, setCurrentSubjectID] = useState('')
    const [taskType, setTaskType] = useState('Assignment')
    const [taskTitle, setTaskTitle] = useState('')
    const [taskDesc, setTaskDesc] = useState('')
    const [selectedDate, setSelectedDate] = useState(moment())
    const [calendarFocused, setCalendarFocused] = useState(null)

    useEffect(() => {
        if (subjects[0]) {
            setCurrentSubjectID(subjects[0].id)
        }
    },[])

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post(url + '/api/Tasks/create',
                {
                    "id": 0,
                    "taskType": taskType,
                    "title": taskTitle,
                    "description": taskDesc,
                    "hours": 0,
                    "subjectId": currentSubjectID,
                    "dueDate": selectedDate.format("YYYY-MM-DD"),
                    "userId": id,
                },
                {
                    headers: {
                        'Authorization': 'bearer ' + token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })

                loadTasks()
                turnOffAdding()


        } catch (e) {
            console.log(e)
        }


        console.log(currentSubjectID)
        console.log(taskType)
        console.log(taskTitle)
        console.log(taskDesc) 
        console.log(selectedDate)
        // TODO
        // ADD DUE DATE
    }

    return (
        <div className="add-task">
            <div className="add-task-header">
                <span>Add Task</span>
                <div>
                </div>
            </div>
            <div className="add-task-body">
                <form onSubmit={onSubmit}>
                    <div className="top-row">
                    </div>
                Class:
                <select required onChange={(e) => setCurrentSubjectID(e.target.value) }>
                        {
                            subjects.map((subject) => {
                                return (<option value={subject.id} key={subject.id}>{subject.name} {subject.classCode}</option>)
                            })
                        }
                    </select>
                Type:
                    <select name="choose type" required onChange={(e) => {
                        console.log(e.target.value)
                        setTaskType(e.target.value)
                    }}>
                        
                        <option value="Assignment">Assignment</option>
                        <option value="Quiz">Quiz</option>
                        <option value="Test">Test</option>
                        <option value="Exam">Exam</option>
                    </select> <br />

                    <SingleDatePicker
                        date={selectedDate} // momentPropTypes.momentObj or null
                        onDateChange={date => {
                            console.log(date)
                            setSelectedDate(date)
                        }} // PropTypes.func.isRequired
                        focused={calendarFocused} // PropTypes.bool
                        onFocusChange={({ focused }) => setCalendarFocused( focused )} // PropTypes.func.isRequired
                        id="your_unique_id" // PropTypes.string.isRequired,
                        numberOfMonths={1}
                    />

                    <label>Title: </label>
                    <input className="inp" required value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
                    <label>Description: </label><textarea onChange={(e) => {
                        setTaskDesc(e.target.value)
                    }} />
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

export default connect(mapStateToProps)(AddTask)