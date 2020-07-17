import React, { useState } from 'react'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'
import axios from 'axios'
import url from '../environment/url'
import { connect } from 'react-redux'
import {} from 'react-icons'


const TaskEdit = ({ currentTaskCopy, token, id, subjects, loadTasks, setIsEditing, setCurrentTask }) => {

    const [title, setTitle ] = useState(currentTaskCopy.title)
    const [description, setDescription ] = useState(currentTaskCopy.description)
    const [subjectID, setSubjectID] = useState(currentTaskCopy.className)
    const [taskType, setTaskType] = useState(currentTaskCopy.taskType)
    const [isDone, setIsDone] = useState(currentTaskCopy.isDone)
    const [selectedDate, setSelectedDate] = useState(moment(currentTaskCopy.dueDate))
    const [calendarFocused, setCalendarFocused] = useState(null)

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.put(url + '/api/Tasks/' + currentTaskCopy.id, {
                ...currentTaskCopy,
                title,
                description,
                subjectID,
                taskType,
                dueDate: selectedDate,
                isDone: isDone ? 1 : 0
            }, {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })

            if (res.status === 200) {
                setCurrentTask({
                    ...currentTaskCopy,
                title,
                description,
                subjectID,
                taskType,
                isDone: isDone ? 1 : 0
                })
                loadTasks()
                setIsEditing(false)

            }

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
            <span>Edit Task</span>
            <FaCancel />
            </div>
            <div className="edit-task-body">
                <form onSubmit={onSubmit}>
                    {/* TITLE */}
                    <label className="inpLabel">Title: </label>
                    <input
                    className="inp"
                    value={title} 
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }} /> <br />

                    {/* NOTES */}

                    <label>Notes: </label>
                    <input value={description} onChange={(e) => {
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
                    <label>Class Type</label>
                    <select required onChange={(e) => setSubjectID(e.target.value) }>
                        {
                            subjects.map((subject) => {
                                return (<option value={subject.id} key={subject.id}>{subject.name} {subject.classCode}</option>)
                            })
                        }
                    </select>

                    {/* COMPLETED CHECKBOX */}

                    <select onChange={(e) => {
                        setTaskType(e.target.value)
                    }}> 
                        <option value="Assignment">Assignment</option>
                        <option value="Quiz">Quiz</option>
                        <option value="Test">Test</option>
                        <option value="Exam">Exam</option>
                    </select><br />


                    {/* COMPLETED CHECKBOX */}

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