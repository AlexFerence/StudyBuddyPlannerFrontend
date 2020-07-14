import React, { useState } from 'react'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'
import axios from 'axios'
import url from '../environment/url'
import { connect } from 'react-redux'

const TaskEdit = ({ currentTaskCopy, token, id }) => {

    const [title, setTitle ] = useState(currentTaskCopy.title)
    const [description, setDescription ] = useState(currentTaskCopy.description)

    const [className, setClassName] = useState(currentTaskCopy.className)
    const [taskType, setTaskType] = useState(currentTaskCopy.taskType)
    const [isDone, setIsDone] = useState(currentTaskCopy.isDone)

    const [selectedDate, setSelectedDate] = useState(moment(currentTaskCopy.dueDate))
    const [calendarFocused, setCalendarFocused] = useState(null)

    const onSubmit = (e) => {
        e.preventDefault()

        try {
            const res = axios.post(url + '/api/Tasks/' + currentTaskCopy.id, {
                ...currentTaskCopy,
                title,
                description,
                className,
                taskType,
                isDone
            }, {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
            )
        } catch (e) {
            console.log(e)
        }

        //make update axios call
        //turn off editing
        //set current slection to the response from http

    }

    return (
        <div className="edit-task">
            <div className="edit-task-header">
            <h4>Edit Task</h4>
            </div>
            <div className="edit-task-body">
                <form onSubmit={onSubmit}>

                    {/* TITLE */}

                    <label>Title: </label>
                    <input
                    value={title} 
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }} /> <br />

                    {/* NOTES */}

                    <label>Notes: </label>
                    <input onChange={(e) => {
                        setDescription(e.target.value)
                    }} />

                    {/* CALENDAR */}

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

                    {/* TASK TYPE */}
                    
                    <label>Task Type:</label>
                    <select name="choose type" required onChange={(e) => {
                        console.log(e.target.value)
                        setTaskType(e.target.value)
                    }}> 
                        <option value="Assignment">Assignment</option>
                        <option value="Quiz">Quiz</option>
                        <option value="Test">Test</option>
                        <option value="Exam">Exam</option>
                    </select><br />

                    {/* TASK TYPE */}
                    Is Completed: <input 
                    type="checkbox"
                    checked={isDone}
                    onChange={() => {
                        setIsDone(!isDone)
                    }}
                    /><br />

                    <button type="submit">Submit</button>
                    <button>Cancel</button>
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

export default connect(mapStateToProps)(TaskEdit)