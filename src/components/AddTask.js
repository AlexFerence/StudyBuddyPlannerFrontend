import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import url from '../environment/url'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'
import { loadTasks, setCurrentTaskById } from '../thunks/taskThunk'
import Select from 'react-select';
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css';




const AddTask = ({ subjects, displayOn, token, id, dispatch, setDisplayType, semesters }) => {

    const findActiveSemester = () => {
        const currentDay = moment()
        const activeSemester = semesters.find((semester) => {
            const isAfterStartDate = currentDay.isAfter(semester.startDate)
            const isBeforeEndDate = currentDay.isBefore(semester.endDate)
            return isAfterStartDate && isBeforeEndDate
        })
        return activeSemester
    }

    const subjReduce = (list = [], item) => {
        const activeSemester = findActiveSemester()
        if (activeSemester && activeSemester.id) {
            if (item.semesterId === activeSemester.id) {
                list.push({ value: item, label: item.name + " " + item.classCode })
            }
        }
        return list

    }

    //const activeSemester = semesters.find((semester) => semester.active === 1)

    const [currentSubjectID, setCurrentSubjectID] = useState('')
    const [currentClass, setCurrentClass] = useState()
    const [currentClassError, setCurrentClassError] = useState()
    const [taskType, setTaskType] = useState({ value: 'Assignment', label: 'Assignment' })
    const [taskTitle, setTaskTitle] = useState('')
    const [taskDesc, setTaskDesc] = useState('')
    const [selectedDate, setSelectedDate] = useState(moment())
    const [calendarFocused, setCalendarFocused] = useState(null)
    const [selectedOption, setSelectedOption] = useState('')

    useEffect(() => {
        console.log(findActiveSemester())
    }, [])

    const options = [
        { value: 'Assignment', label: 'Assignment' },
        { value: 'Readings', label: 'Readings' },
        { value: 'Essay', label: 'Essay' },
        { value: 'Lab', label: 'Lab' },
        { value: 'General Studying', label: 'General Studying' },
        { value: 'Lecture', label: 'Lecture' },
        { value: 'Quiz/Midterm/Exam', label: 'Quiz/Midterm/Exam' }
    ]

    useEffect(() => {
        if (subjects[0]) {
            setCurrentSubjectID(subjects[0].id)
        }
    }, [])

    const onSubmit = async (e) => {

        e.preventDefault()

        //errro handelling

        if (!currentClass) {
            setCurrentClassError('please enter class')
            return
        }

        try {
            const res = await axios.post(url + '/api/Tasks/create',
                {
                    taskType: taskType.value,
                    title: taskTitle,
                    description: taskDesc,
                    hours: 0,
                    subjectId: currentClass.value.id,
                    dueDate: selectedDate.format("YYYY-MM-DD"),
                    userId: id,
                    isDone: 0
                },
                {
                    headers: {
                        'Authorization': 'bearer ' + token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
            console.log('adding task')
            console.log(res)
            await dispatch(loadTasks())
            console.log('loading tasks')
            await dispatch(setCurrentTaskById(res.data.id))
            displayOn()
            console.log('should have turned display')
            //setDisplayType('display')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="add-task">
            <div className="add-task-header" style={(currentClass) && { backgroundColor: (currentClass.value.color || '#2b2b2b') }}>
                <span>Add Task</span>
                <div>
                </div>
            </div>
            <div className="add-task-body">
                <form onSubmit={onSubmit}>
                    <label className="inpLabel">Class:</label>
                    {currentClassError && <span className="error">* {currentClassError}</span>}
                    <Select
                        value={currentClass}
                        onChange={val => setCurrentClass(val)}
                        placeholder="Class..."
                        options={subjects.reduce(subjReduce, [])}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                text: 'black',
                                primary25: '#bcbcbc',
                                primary50: '#bcbcbc',
                                primary: '#bcbcbc',
                            },
                        })}
                    />
                    <label className="inpLabel">Type:</label>
                    <Select
                        value={taskType}
                        onChange={val => setTaskType(val)}
                        placeholder="Type..."
                        options={options}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                text: 'black',
                                primary25: '#bcbcbc',
                                primary50: '#bcbcbc',
                                primary: '#bcbcbc',
                            },
                        })}
                    />
                    <label className="inpLabel">Title:</label>
                    <input className="inp" required value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
                    <label className="inpLabel">Due Date:</label>
                    <SingleDatePicker
                        date={selectedDate} // momentPropTypes.momentObj or null
                        onDateChange={date => {
                            console.log(date)
                            setSelectedDate(date)
                        }} // PropTypes.func.isRequired
                        focused={calendarFocused} // PropTypes.bool
                        onFocusChange={({ focused }) => setCalendarFocused(focused)} // PropTypes.func.isRequired
                        id="your_unique_id" // PropTypes.string.isRequired,
                        numberOfMonths={1}
                        hideKeyboardShortcutsPanel={true}
                    />
                    <label className="inpLabel">Description: (optional)</label>
                    <textarea className="inpArea" rows="3" onChange={(e) => {
                        setTaskDesc(e.target.value)
                    }} />
                    <button className="but" type="submit">Submit</button>
                    <button className="but" onClick={(e) => {
                        e.preventDefault()
                        setDisplayType('')
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
        subjects: state.subjects,
        semesters: state.profile.semesters
    }
}

export default connect(mapStateToProps)(AddTask)