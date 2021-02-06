import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'
import { connect } from 'react-redux'
import { IoMdClose } from 'react-icons/io'
import Select from 'react-select';
import { setCurrentTask } from '../actions/currentTaskActions'
import { loadTasks, updateTask, setCurrentTaskById } from '../thunks/taskThunk'

const TaskEdit = ({ semesters, subjects, dispatch, displayOn, currentTask }) => {

    const getClassString = (id) => {
        const subj = subjects.find((subject) => subject.id === id)
        if (subj) {
            return (subj.name + " " + subj.classCode)
        }
        return undefined
    }
    const getClass = (id) => {
        return subjects.find((subject) => subject.id === id)
    }

    var [currentTaskCopy, setCurrentTaskCopy] = useState({ ...currentTask })
    var [currentClass, setCurrentClass] = useState({ value: getClass(currentTask.subjectId), label: getClassString(currentTask.subjectId) })
    var [taskType, setTaskType] = useState({ value: currentTask.taskType, label: currentTask.taskType })
    var [selectedDate, setSelectedDate] = useState(moment(currentTask.dueDate))
    var [title, setTitle] = useState(currentTask.title)
    var [isDone, setIsDone] = useState(currentTask.isDone)
    var [calendarFocused, setCalendarFocused] = useState(null)
    var [description, setDescription] = useState(currentTask.description)


    useEffect(() => {
        //may not need this
        currentTaskCopy = { ...currentTask }
    }, [])

    // const subjReduce = (list, item) => {
    //     list.push({ value: item, label: item.name + " " + item.classCode })
    //     return list
    // }

    const findActiveSemester = () => {
        console.log('Semesters')
        console.log(semesters)
        const currentDay = moment()
        const activeSemester = semesters.find((semester) => {
            const isAfterStartDate = currentDay.isAfter(semester.startDate)
            const isBeforeEndDate = currentDay.isBefore(moment(semester.endDate))
            console.log('isBeforeEndDate ' + isBeforeEndDate)
            console.log('isAfterStartDate ' + isAfterStartDate)
            return isAfterStartDate && isBeforeEndDate
        })
        return activeSemester
    }

    const subjReduce = (list = [], item) => {
        const activeSemester = findActiveSemester()
        console.log('Active semester')
        console.log(activeSemester)
        if (activeSemester && activeSemester.id) {
            if (item.semesterId === activeSemester.id) {
                list.push({ value: item, label: item.name + " " + item.classCode })
            }
        }
        return list
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(currentClass.value.id)
        const s = await dispatch(updateTask({
            ...currentTaskCopy,
            subjectId: currentClass.value.id,
            taskType: taskType.value,
            isDone: isDone ? 1 : 0,
            description,
            title,
            dueDate: moment(selectedDate)
        }
        ))
        // console.log({
        //     ...currentTaskCopy,
        //     subjectId: currentClass.value.subjectId,
        //     taskType: taskType.value,
        //     isDone: isDone ? 1 : 0,
        //     description,
        //     title,
        //     dueDate: moment(selectedDate).format("YYYY-MM-DD")
        // })
        displayOn()
        //console.log('dispatching')
        //console.log('setting current task' + currentTaskCopy.id)
        dispatch(setCurrentTaskById(currentTaskCopy.id))


    }


    return (
        <div className="edit-task">
            <div className="edit-task-header" style={{ backgroundColor: currentClass.value.color }}>
                <div className="title">Edit</div>
                <button onClick={() => { displayOn() }}><IoMdClose /></button>
            </div>
            <div className="edit-task-body">
                <form onSubmit={onSubmit}>
                    {/* CLASS TYPE */}
                    <label className="inpLabel">Class Type</label>
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

                    {/* TASK TYPE */}

                    <label className="inpLabel">Task Type: </label>
                    <Select
                        value={taskType}
                        onChange={val => setTaskType(val)}
                        placeholder="Type..."
                        options={[
                            { value: 'Assignment', label: 'Assignment' },
                            { value: 'Readings', label: 'Readings' },
                            { value: 'Essay', label: 'Essay' },
                            { value: 'Lab', label: 'Lab' },
                            { value: 'General Studying', label: 'General Studying' },
                            { value: 'Lecture', label: 'Lecture' },
                            { value: 'Quiz/Midterm/Exam', label: 'Quiz/Midterm/Exam' }
                        ]}
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


                    {/* TITLE */}
                    <label className="inpLabel">Title: </label>
                    <input
                        className="inp"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }} /> <br />


                    {/* CALENDAR */}
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

                    {/* NOTES */}

                    <label className="inpLabel">Description: </label>
                    <textarea
                        className="inpArea"
                        value={description} onChange={(e) => {
                            setDescription(e.target.value)
                        }} />


                    {/* COMPLETED CHECKBOX */}


                    <button type="submit" className="but">Submit</button>
                    <button className="but">Cancel</button>
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
        currentTask: state.currentTask,
        semesters: state.profile.semesters
    }
}

export default connect(mapStateToProps)(TaskEdit)