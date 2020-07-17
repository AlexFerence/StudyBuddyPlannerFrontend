import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'
import axios from 'axios'
import url from '../environment/url'
import { connect } from 'react-redux'
import { IoMdClose } from 'react-icons/io'
import Select from 'react-select';


const TaskEdit = ({ currentTaskCopy, token, id, subjects, loadTasks, setIsEditing, setCurrentTask, getClassColor }) => {

    const getSubject = (id) => {
        return subjects.find((subject) => subject.id === id)
    }

    const [title, setTitle ] = useState(currentTaskCopy.title)
    const [description, setDescription ] = useState(currentTaskCopy.description)
    const [subjectID, setSubjectID] = useState(currentTaskCopy.subjectId)
    const [taskType, setTaskType] = useState({ value: currentTaskCopy.taskType, label: currentTaskCopy.taskType})
    const [isDone, setIsDone] = useState(currentTaskCopy.isDone)
    const [selectedDate, setSelectedDate] = useState(moment(currentTaskCopy.dueDate))
    const [calendarFocused, setCalendarFocused] = useState(null)

    const [currentClass, setCurrentClass] = useState({ value: getSubject(currentTaskCopy.subjectId), label: 'class' })

    

    const subjReduce = (list, item) => {
        list.push({ value: item, label: item.name + " " + item.classCode })
        return list
    }

    useEffect(() => {
        console.log(currentClass)
        console.log(currentClass.value.color)
    }, [currentClass])

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.put(url + '/api/Tasks/' + currentTaskCopy.id, {
                ...currentTaskCopy,
                title,
                description,
                subjectID: currentClass.value.id,
                taskType: taskType.value,
                dueDate: selectedDate,
                isDone: isDone ? 1 : 0,
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
                subjectId: currentClass.value.id,
                taskType: taskType.value,
                isDone: isDone ? 1 : 0,
                color: currentClass.value.color
                })
                loadTasks()
                setIsEditing(false)
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        console.log(subjectID)
    }, [subjectID])

    return (
        <div className="edit-task">
            <div className="edit-task-header" style={{ backgroundColor: currentClass.value.color}}>
            <span>Edit Task</span>
            <button><IoMdClose /></button>
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

                    <label className="inpLabel">Notes: </label>
                    <input 
                    className="inp"
                    value={description} onChange={(e) => {
                        setDescription(e.target.value)
                    }} />

                    {/* CALENDAR */}
                    <label className="inpLabel">Due Date:</label>
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
                        hideKeyboardShortcutsPanel={true}
                    />

                    {/* CLASS TYPE */}
                    <label className="inpLabel">Class Type</label>
                    <Select
                        value={currentClass}
                        onChange={val => setCurrentClass(val)}
                        placeholder="Class..."
                        options={subjects.reduce(subjReduce, [])}
                    />

                    {/* TASK TYPE */}

                    <label className="inpLabel">Task Type: </label>
                    <Select
                        value={taskType}
                        onChange={val => setTaskType(val)}
                        placeholder="Type..."
                        options={[
                            { value: 'Assignment', label: 'Assignment' },
                            { value: 'Quiz', label: 'Quiz' },
                            { value: 'Test', label: 'Test' },
                            { value: 'Exam', label: 'Exam' }
                        ]}
                    />


                    {/* COMPLETED CHECKBOX */}

                    <div className="isComplete">Is Completed:  <input 
                    type="checkbox"
                    checked={isDone}
                    onChange={() => {
                        setIsDone(!isDone)
                    }}
                    />
                    </div>
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