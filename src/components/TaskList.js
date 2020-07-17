import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { FaCheck } from 'react-icons/fa'

const TaskList = ({ tasks, subjects, turnOnAdding, setCurrentTask, setIsAddingTask, setCurrentT,  setIsEditing }) => {

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
                        onClick={() => {
                            setCurrentTask(t)
                            setIsAddingTask(false)
                            setIsEditing(false)
                            console.log(t)
                            console.log(t.color)
                        }}>
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
        subjects: state.subjects
    }
}

export default connect(mapStateToProps)(TaskList)