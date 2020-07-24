import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { FaCheck } from 'react-icons/fa'
import swal from 'sweetalert'
import { pausedReduxOn, pausedReduxOff, runningReduxOff, setCount } from '../actions/isRunningActions'

import { runningOnThunk, runningOffThunk } from '../thunks/userActivityThunk'


const TaskList = ({ currentTask, tasks, subjects, turnOnAdding, setCurrentTask, setIsAddingTask, setCurrentT,  
    setIsEditing, running, paused, dispatch }) => {

    const getClassName = (subjectId) => {
        console.log(subjectId)
        const subj = subjects.find((subject) => subject.id === subjectId)
        if (subj) {
            return(subj.name + " " + subj.classCode)
        }
        else {
            return("no class found")
        }
    }

    useEffect(() => {
        dispatch(runningOffThunk())
        dispatch(pausedReduxOff())
    }, [])

    const getClassColor = (subjectId) => {
        const subj = subjects.find((subject) => subject.id === subjectId)

        if (subj) {
            return(subj.color)
        }
        else {
            return(undefined)
        }
    }

    const returnParsedMoment = (date) => {
        var momentDay = moment(date)
        return momentDay.format("MMM D")
    }

    const taskClicked = (t) => {
        if ((running || paused) && (t.id !== currentTask.id)) {
            swal({
                title: "Can't switch tasks during study session",
                icon: "info",
                buttons: true,
                dangerMode: true,
            })
        }
        else {
            setCurrentTask(t)
            setIsAddingTask(false)
            setIsEditing(false)

        }


    }

    return (
        <div className="task-list">
            <div className="classHeader">
                    <div className="left">
                        <div className="title">
                        Tasks
                        
                        </div>
                    </div>
                    <div className="right">
                        <button onClick={() => {
                            turnOnAdding()
                            setCurrentTask({})
                        }}>+ Add Task</button>
                    </div>
                </div>
            {
                tasks.map((t) => {
                    return (
                        <div 
                        style={{borderLeft: '5px solid ' + getClassColor(t.subjectId)}}
                        className="task-button"
                        key={t.id}
                        onClick={() => taskClicked(t)}>
                            <div className="top-bar">
                                <div className="subjTitle">{t.title}</div>
                                <div className="due">{returnParsedMoment(t.dueDate)}</div>
                            </div>
                            <div className="bottom-bar">
                                <div className="subjDesc">{
                                    getClassName(t.subjectId)
                                }</div>
                                <div className="due"><button><FaCheck /></button></div>
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
        paused: state.running.paused
    }
}

export default connect(mapStateToProps)(TaskList)