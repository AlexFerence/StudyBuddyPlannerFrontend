import React, { useState } from 'react'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'

const TaskEdit = ({ currentTaskCopy }) => {

    const [title, setTitle ] = useState(currentTaskCopy.title)
    const [description, setDescription ] = useState(currentTaskCopy.description)

    const [className, setClassName] = useState(currentTaskCopy.className)
    const [taskType, setTaskType] = useState(currentTaskCopy.taskType)
    const [isDone, setIsDone] = useState(currentTaskCopy.isDone)

    const [selectedDate, setSelectedDate] = useState(moment(currentTaskCopy.dueDate))
    const [calendarFocused, setCalendarFocused] = useState(null)

    return (
        <div className="edit-task">
            <div className="edit-task-header">
            <h4>Edit Task</h4>
            </div>
            <div className="edit-task-body">
                <form>

                    {/* TITLE */}

                    <label>Title: </label>
                    <input
                    value={title} 
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }} />

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
                    


                    <button type="submit">Submit</button>
                    <button>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default TaskEdit