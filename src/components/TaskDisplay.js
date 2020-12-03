import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import Counter from './Timer'
import 'react-circular-progressbar/dist/styles.css';
import { FaEdit, FaCalendarAlt, FaGraduationCap, FaPencilAlt, FaTrashAlt, FaCheck, FaArrowDown } from 'react-icons/fa'
import { IoMdTime, IoMdCheckmark } from 'react-icons/io'
import { Row, Col } from 'react-bootstrap'
import moment from 'moment'
import Select from 'react-select';
import TimeInput from './TaskTimeInput'
import Stopwatch from './Stopwatch'
import { getClassColor, getClassName } from '../thunks/subjectThunk'
//import { getTask } from '../thunks/taskThunk';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { markTaskAsDone, unmarkTaskAsDone, deleteTask, setCurrentTaskById, loadTasks } from '../thunks/taskThunk'
import { FaAngleDown, FaLock, FaAngleUp } from 'react-icons/fa'
import swal from 'sweetalert'
import { getSessionsThunk, deleteSessionThunk } from '../thunks/sessionsThunk'

const hoursToTimeDisplay = (h) => {
    var hours = Math.floor(h)
    var decimalMins = (h - hours) * 60
    var returnMins = Math.floor(decimalMins)
    if (decimalMins < 10) {
        returnMins = "0" + returnMins
    }
    return (hours + ":" + returnMins)
}

const TaskDisplay = ({ currentTask, editingOn, isRunning, paused, setCurrentTask, dispatch, blankOn }) => {

    const [timerSetting, setTimerSetting] = useState({ value: 'Timer', label: 'Timer' })
    const [sessionsOpen, setSessionsOpen] = useState(false)
    const [spinning, setSpinning] = useState(false)
    const messagesEndRef = React.createRef()

    const scrollToBottom = () => {
        if (sessionsOpen) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }

    useEffect(scrollToBottom, [currentTask.taskSessions]);

    const handleDelete = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, all data for this task will be lost!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                blankOn()
                dispatch(deleteTask(currentTask.id))
            }
        }).then((idk) => {
            console.log(idk)
        }).catch((e) => {
            console.log(e)
        })

    }
    const handleCompleted = () => {
        if (currentTask.totalTime === "00:00:00") {
            swal({
                title: "Must Add Time",
                text: "Task can't be completed without a study session (0 mins spent).",
                icon: "warning",
                button: true,
                dangerMode: true,
            })
        }
        else {
            if (currentTask.isDone === 0) {
                console.log('task is NOT DONE')
                dispatch(markTaskAsDone(currentTask.id))
                blankOn()
            }
            else {
                console.log('task is DONE')
                dispatch(unmarkTaskAsDone(currentTask.id))
            }
        }
    }
    const handleDeleteSession = (sessionId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, all data for this task will be lost!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {

                console.log('delete session')
                dispatch(deleteSessionThunk(sessionId))


                //call delete session here
            }
        }).then(() => {
            dispatch(loadTasks())
        }).catch((e) => {
            console.log(e)
        })
    }
    const returnParsedMoment = (date) => {
        var momentDay = moment(date)
        return momentDay.format("MMM D")
    }

    return (
        <div className="display-task">
            <div className="display-task-header" style={{ backgroundColor: currentTask.color }}>
                <div className="idTitle">{currentTask.title}</div>
                <div>
                    <button
                        className="icon"
                        id="check-hover"
                        onClick={handleCompleted}
                    ><FaCheck className="" /></button>
                    <button
                        className="icon"
                        id="edit-hover"
                        onClick={() => {
                            editingOn()
                        }}
                    ><FaEdit /></button>
                    <button
                        id="trash"
                        onClick={handleDelete}
                        className="icon"
                    ><FaTrashAlt /></button>
                </div>
            </div>
            <div className="display-task-body">
                <Row>
                    {false && <Col md={6}>
                        <div className="d-flex align-items-end info">
                            <span className="calendarIcon"><FaCalendarAlt /></span>  Due: {moment(currentTask.dueDate).format("MMMM DD")}
                        </div>
                        <div className="d-flex align-items-end info">
                            <span className="calendarIcon"><FaGraduationCap /></span>  Class: {currentTask.subjectTitle}
                        </div>
                        <div className="d-flex align-items-end info">
                            <span className="calendarIcon"><IoMdTime /></span>  Total: {currentTask.totalTime.substring(0, currentTask.totalTime.length - 3) || 0}
                        </div>
                        <div className="d-flex align-items-end info">
                            <span className="calendarIcon"><FaPencilAlt /></span>   Task type: {currentTask.taskType}
                        </div>
                        <div className="d-flex align-items-end info">
                            <span className="calendarIcon"></span>  Notes:
                        </div>
                        <div>
                            <div className="multiLine">{currentTask.description}</div>
                        </div>


                    </Col>}
                    <Col md={12}>
                        <Select
                            className="timerSelect"
                            value={timerSetting}
                            onChange={val => setTimerSetting(val)}
                            placeholder="Type..."
                            isDisabled={isRunning || paused}
                            options={[
                                { value: 'Timer', label: 'Timer' },
                                { value: 'Stopwatch', label: 'Stopwatch' },
                                { value: 'Time Input', label: 'Time Input' },
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
                        {timerSetting.value === 'Timer' &&
                            <Counter
                                color={getClassColor(currentTask.subjectId)}
                            //currentTask={currentTask}

                            />}
                        {timerSetting.value === 'Stopwatch' &&
                            <Stopwatch />
                        }
                        {timerSetting.value === 'Time Input' &&
                            <TimeInput
                            />
                        }
                    </Col>
                </Row>
                <div>
                    <div className="taskSessionsBar">
                        <button className="but" onClick={() => {
                            setSessionsOpen(!sessionsOpen)
                            scrollToBottom()
                        }}>Sessions {!sessionsOpen ? <FaAngleDown /> : <FaAngleUp />}</button>
                        <div>
                            {
                                false &&
                                <Fragment>
                                    <button
                                        className="but complete"
                                        onClick={handleCompleted}
                                    ><FaCheck className="green" /> Completed</button>
                                    <button
                                        onClick={handleDelete}
                                        id="trash"
                                        className="but complete"
                                    ><FaTrashAlt /></button>
                                </Fragment>
                            }

                        </div>
                    </div>

                    {sessionsOpen &&

                        <div className="sessionsTable">
                            <table>
                                <thead>
                                    <tr>
                                        <th style={{ backgroundColor: currentTask.color }}>Minutes</th>
                                        <th style={{ backgroundColor: currentTask.color }}>Date</th>
                                        <th style={{ backgroundColor: currentTask.color, width: '20px' }}></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        currentTask &&
                                        currentTask.taskSessions.map((session) => {
                                            return (
                                                <tr key={session.id}>
                                                    <td>{hoursToTimeDisplay(session.minutes / 60)}</td>
                                                    <td >{moment(session.dateCompleted).format("MMM D")}</td>
                                                    {
                                                        <td style={{ width: '20px' }} onClick={() => handleDeleteSession(session.id)}>
                                                            <FaTrashAlt id="trash" className="trash-session" />
                                                        </td>

                                                    }

                                                </tr>
                                            )
                                        })
                                    }
                                    <tr ref={messagesEndRef}>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        subjects: state.subjects,
        isRunning: state.running.isRunning,
        paused: state.running.paused,
        currentTask: state.currentTask,

    }
}

export default connect(mapStateToProps)(TaskDisplay)