import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setCurrentTask } from '../../actions/currentTaskActions'
import moment from 'moment'
import swal from 'sweetalert'
import { markTaskAsDone, unmarkTaskAsDone } from '../../thunks/taskThunk'

const TaskListItem = ({ blankOn, dispatch, task, subjects, running, paused, tasks, currentTask, displayOn }) => {

    const [isGrey, setIsGrey] = useState(false)

    const getClassColor = (subjectId) => {
        const subj = subjects.find((subject) => subject.id === subjectId)
        if (subj) {
            return (subj.color)
        }
        else {
            return (undefined)
        }
    }

    const getClassName = (subjectId) => {
        const subj = subjects.find((subject) => subject.id === subjectId)
        if (subj) {
            return (subj.name + " " + subj.classCode)
        }
        else {
            return ("no class found")
        }
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

    const returnParsedMoment = (date) => {
        var momentDay = moment(date)
        if (moment(date).isBefore((moment().add(0, 'days')))) {
            return <div style={{ color: 'red' }}>{momentDay.format("MMM D")}</div>
        }
        if (moment(date).isBefore(moment().add(2, 'days'))) {
            return <div style={{ color: '#FFAE42' }}>{momentDay.format("MMM D")}</div>
        }
        return <div>{momentDay.format("MMM D")}</div>
    }

    const returnParsedDone = (date) => {
        var momentDay = moment(date)
        // if (moment(date).isBefore((moment().add(0, 'days')))) {
        //     return <div style={{ color: 'red' }}>{momentDay.format("MMM D")}</div>
        // }
        // if (moment(date).isBefore(moment().add(2, 'days'))) {
        //     return <div style={{ color: '#FFAE42' }}>{momentDay.format("MMM D")}</div>
        // }
        return <div style={{ color: '#BCBCBC' }}>{momentDay.format("MMM D")}</div>
    }


    const handleCompleted = () => {
        if (currentTask.totalTime === "00:00:00") {
            swal({
                title: "Are you sure?",
                text: "Task can't be completed without a study session (0 mins spent).",
                icon: "warning",
                button: true,
                dangerMode: true,
            })
        }
        else {
            if (currentTask.isDone === 0) {
                setIsGrey(true)
                setTimeout(() => {
                    dispatch(markTaskAsDone(currentTask.id))
                    blankOn()
                    setTimeout(() => {
                        setIsGrey(false)
                    }, 500)
                }, 600)
            }
            else {
                console.log('task is DONE')
                dispatch(unmarkTaskAsDone(currentTask.id))
            }
        }
    }

    return (
        <div
            style={task.isDone ?
                {
                    borderLeft: '5px solid ' + getClassColor(task.subjectId),
                }
                :
                { borderLeft: '5px solid' + getClassColor(task.subjectId) }}
            className="task-button"
            key={task.id}
            onClick={() => taskClicked(task)}>
            <div className="top-bar">
                <div className="subjTitle"
                    style={
                        task.isDone || isGrey ? { color: '#BCBCBC' } :
                            {}
                    }
                >{task.title}</div>
                <div className="due">
                    {
                        task.isDone || isGrey ? returnParsedDone(task.dueDate) :
                            returnParsedMoment(task.dueDate)
                    }
                </div>
            </div>
            <div className="bottom-bar">
                <div className="subjDesc" style={
                    task.isDone || isGrey ? { color: '#BCBCBC' } :
                        {}
                }>{

                        getClassName(task.subjectId) + '  ' + task.taskType
                    }</div>

                <div class={task.isDone ? "checkbox coloured" : "checkbox coloured-brand"}>
                    <label>
                        {task.isDone ?
                            <>
                                <input id="check" onChange={handleCompleted} type="checkbox" checked /><span class="checkbox-material"><span class="check"></span></span>
                            </>
                            :
                            <>
                                <input id="check" onChange={handleCompleted} type="checkbox" /><span class="checkbox-material"><span class="check"></span></span>
                            </>
                        }

                    </label>
                </div>

            </div>
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

export default connect(mapStateToProps)(TaskListItem)