import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { FaCheck } from 'react-icons/fa'
import swal from 'sweetalert'
import { pausedReduxOn, pausedReduxOff, runningReduxOff, setCount } from '../actions/isRunningActions'
import { runningOnThunk, runningOffThunk } from '../thunks/userActivityThunk'
import { setCurrentTask } from '../actions/currentTaskActions'
import Select from 'react-select';
import { loadTasks } from '../thunks/taskThunk'


const TaskList = ({ currentTask, tasks, subjects, addingOn, displayOn,
    running, paused, dispatch }) => {

    const [filterBy, setFilterBy] = useState({ value: 'Due Date', label: 'Due Date' })
    const [filterByCompleted, setFilterByCompleted] = useState(true)

    const getClassName = (subjectId) => {
        const subj = subjects.find((subject) => subject.id === subjectId)
        if (subj) {
            return (subj.name + " " + subj.classCode)
        }
        else {
            return ("no class found")
        }
    }

    useEffect(() => {
        dispatch(runningOffThunk())
        dispatch(pausedReduxOff())
        //setFilterByCompleted(false)
    }, [])

    useEffect(() => {
        console.log(filterByCompleted)
        console.log(filterBy)
        dispatch(
            loadTasks((filterBy.value === 'Due Date' ? true : false), filterByCompleted)
        )
    }, [filterByCompleted ,filterBy])

    const getClassColor = (subjectId) => {
        const subj = subjects.find((subject) => subject.id === subjectId)
        if (subj) {
            return (subj.color)
        }
        else {
            return (undefined)
        }
    }

    const returnParsedMoment = (date) => {
        var momentDay = moment(date)
        if (moment(date).isBefore((moment().add(0, 'days')))) {
            return <div style={{ color:'red'}}>{momentDay.format("MMM D")}</div>
        }
        if (moment(date).isBefore(moment().add(2, 'days'))){
            return <div style={{ color:'#FFAE42' }}>{momentDay.format("MMM D")}</div>
        }
        return <div>{momentDay.format("MMM D")}</div>
    }

    const taskClicked = (t) => {
        displayOn()
        if ((running || paused) && (t.id !== currentTask.id)) {
            swal({
                title: "Can't switch tasks during study session",
                icon: "info",
                buttons: true,
                dangerMode: true,
            })
        }
        else {
            dispatch(setCurrentTask({
                ...t,
                color: getClassColor(t.subjectId),
                subjectTitle: getClassName(t.subjectId)
            }))
        }
    }

    const filterChanged = async (val) => {
        setFilterBy(val)
    }

    const completedChanged = () => {
        setFilterByCompleted(!filterByCompleted)
    }

    return (
        <div className="task-list">
            <div className="classHeader">
                <div>Tasks</div>
                <div className="selectClass"><Select
                value={filterBy}
                onChange={val => filterChanged(val)}
                placeholder="Filter By..."
                options={[
                    { value: 'Due Date', label: 'Due Date' },
                    { value: 'Class', label: 'Class' }
                    
                ]}
            /></div>

                <div className="completedLabel"><div>Completed</div>
                <input 
                type="checkbox" 
                onClick={completedChanged}
                value={filterByCompleted}
                /> </div>
                <button className="addTaskButton" onClick={() => addingOn()}>+ Add Task</button>


            </div>
            {
                tasks.map((t) => {
                    return (
                        <div
                            style={{ borderLeft: '5px solid ' + getClassColor(t.subjectId) }}
                            className="task-button"
                            key={t.id}
                            onClick={() => taskClicked(t)}>
                            <div className="top-bar">
                                <div className="subjTitle">{t.title}</div>
                                <div className="due">
                                {returnParsedMoment(t.dueDate)}
                                </div>
                            </div>
                            <div className="bottom-bar">
                                <div className="subjDesc">{
                                    getClassName(t.subjectId)
                                }</div>
                                <div className="due"></div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        subjects: state.subjects,
        running: state.running.isRunning,
        paused: state.running.paused,
        tasks: state.tasks,
        currentTask: state.currentTask,
 
    }
}

export default connect(mapStateToProps)(TaskList)