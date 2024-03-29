import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import swal from 'sweetalert'
import { setCurrentTask } from '../../actions/currentTaskActions'
import Select from 'react-select';
import { loadTasks } from '../../thunks/taskThunk'
import TaskListItem from './TaskListItem'
import { AnimatedList } from 'react-animated-list';


const TaskList = ({ currentTask, tasks, subjects, addingOn, displayOn,
    running, paused, dispatch, blankOn }) => {

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
        dispatch(
            loadTasks((filterBy.value === 'Due Date' ? true : false), filterByCompleted)
        )
    }, [filterByCompleted, filterBy])

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

    console.log('tasks')
    console.log(tasks)

    return (
        <div>
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
                /></div>

                <div className="completedLabel"><div>Completed</div>
                    <input
                        type="checkbox"
                        onClick={completedChanged}
                        value={filterByCompleted}
                    /></div>
                <button
                    className="addTaskButton"
                    id="addTask"
                    disabled={subjects.length === 0}
                    onClick={() => addingOn()}
                    style={subjects.length === 0 ?
                        { color: 'grey', border: '1px solid grey' } : {}}
                >+ Add Task</button>
            </div>
            <div className='task-list'>
                <AnimatedList animation={"fade"}>
                    {
                        tasks.map((t, index) => {
                            return (
                                <TaskListItem key={index} blankOn={blankOn} task={t} displayOn={displayOn} />
                            )
                        })
                    }
                </AnimatedList>
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

export default connect(mapStateToProps)(TaskList)

// <div
//                             style={t.isDone ?
//                                 {
//                                     borderLeft: '5px solid ' + getClassColor(t.subjectId),
//                                 }
//                                 :
//                                 { borderLeft: '5px solid' + getClassColor(t.subjectId) }}
//                             className="task-button"
//                             key={t.id}
//                             onClick={() => taskClicked(t)}>
//                             <div className="top-bar">
//                                 <div className="subjTitle"
//                                     style={
//                                         t.isDone ? { color: '#BCBCBC' } :
//                                             {}
//                                     }
//                                 >{t.title}</div>
//                                 <div className="due">
//                                     {
//                                         t.isDone ? returnParsedDone(t.dueDate) :
//                                             returnParsedMoment(t.dueDate)
//                                     }
//                                 </div>
//                             </div>
//                             <div className="bottom-bar">
//                                 <div className="subjDesc" style={
//                                     t.isDone ? { color: '#BCBCBC' } :
//                                         {}
//                                 }>{

//                                         getClassName(t.subjectId) + '  ' + t.taskType
//                                     }</div>
//                                 <div className="due">
//                                     <input type="checkbox" style={{ height: '15px', width: '15px' }} />
//                                 </div>
//                             </div>
//                         </div>