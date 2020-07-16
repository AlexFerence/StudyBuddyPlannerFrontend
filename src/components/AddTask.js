import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import url from '../environment/url'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'

import Select from 'react-select';
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css';


const subjReduce = (list ,item) => {
    list.push({value: item, label: item.name + " " + item.classCode })
    return list
}


const AddTask = ({ subjects, turnOffAdding, loadTasks, token, id }) => {



    const [currentSubjectID, setCurrentSubjectID] = useState('')

    const [currentClass, setCurrentClass] = useState('')
    const [taskType, setTaskType] = useState('')
    const [taskTitle, setTaskTitle] = useState('')
    const [taskDesc, setTaskDesc] = useState('')
    const [selectedDate, setSelectedDate] = useState(moment())
    const [calendarFocused, setCalendarFocused] = useState(null)
    const [selectedOption, setSelectedOption] = useState('')



    useEffect(() => {
        if (subjects[0]) {
            setCurrentSubjectID(subjects[0].id)
        }
    },[])

    useEffect(() => {
        console.log(taskType)
    }, [taskType])
    useEffect(() => {
        console.log(currentClass)
    }, [currentClass])

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
                    "subjectId": currentClass.value.id,
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
                    <label className="inpLabel">Title:</label>
                    <input className="inp" required value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
                    
                    <label className="inpLabel">Class:</label>
                    <Select
                        value={currentClass}
                        onChange={val => setCurrentClass(val)}
                        placeholder="Class..."
                        options={subjects.reduce(subjReduce, [])}
                    />
                    <label className="inpLabel">Type:</label>
                    <Select
                        value={taskType}
                        onChange={val => setTaskType(val)}
                        placeholder="Type..."
                        options={[
                            { value: 'Assignment', label: 'Assignment' },
                            { value: 'Quiz', label: 'Quiz' },
                            { value: 'Test', label: 'Test' },
                            { value: 'Exam', label: 'Exam'}
                        ]}
                    />
                <label className="inpLabel">Date:</label>
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

                    <label className="inpLabel">Description: </label>
                    <textarea className="inpArea" rows="3" onChange={(e) => {
                        setTaskDesc(e.target.value)
                    }} />
                    <button className="but" type="submit">Submit</button>
                    <button className="but" onClick={(e) => {
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