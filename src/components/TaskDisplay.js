import React, { useState, useEffect } from 'react'
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
import { markTaskAsDone, unmarkTaskAsDone, deleteTask } from '../thunks/taskThunk'
import { FaAngleDown, FaLock, FaAngleUp } from 'react-icons/fa'
import swal from 'sweetalert'


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
    const messagesEndRef = React.createRef()

    const scrollToBottom = () => {
        if (sessionsOpen) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const makeColor = async (subjId) => {
        try {
            var color = await dispatch(getClassColor(subjId))
            console.log(color)
            return color
        } catch (e) {
            console.log(e)
        }
    }

    // const getTitle = async (subjId) => {
    //     try {
    //         var title = await dispatch(getClassName(subjId))
    //         return title
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }


    useEffect(scrollToBottom, [currentTask.taskSessions]);

    useEffect(() => {
        console.log(currentTask)
        // console.log(task.taskSessions)
        // scrollToBottom()
        // dispatch(getSessionsThunk(task.id)).then((currentTask) => {
        //     setCurrentTask(currentTask)
        // }).catch((e) => {
        //     console.log(e)
        // })
    }, [])



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
        //dispatch(markTaskAsDone(currentTask.id))
        console.log('handle COMPLETED PLEASE')
        if (currentTask.idDone === 0) {
            console.log('task is NOT DONE')
            dispatch(markTaskAsDone(currentTask.id))
            blankOn()
        }
        else {
            console.log('task is DONE')
            dispatch(unmarkTaskAsDone(currentTask.id))
        }

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
                        className="edit"
                        onClick={() => {
                            editingOn()
                        }}
                    ><FaEdit /></button>
                </div>
            </div>
            <div className="display-task-body">
                <Row>
                    <Col md={6}>
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
                            <span className="calendarIcon"><FaPencilAlt /></span>  Notes:
                    </div>
                        <div>
                            <div className="multiLine">{currentTask.description}</div>
                        </div>


                    </Col>
                    <Col md={6}>
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
                            <button
                                className="but complete"
                                onClick={handleCompleted}
                            ><FaCheck className="green" /> Completed</button>
                            <button
                                onClick={handleDelete}
                                className="but complete"
                            ><FaTrashAlt /></button>
                        </div>
                    </div>

                    {sessionsOpen &&

                        <div className="sessionsTable">
                            <table>
                                <thead>
                                    <tr>
                                        <th style={{ backgroundColor: currentTask.color }}>Minutes</th>
                                        <th style={{ backgroundColor: currentTask.color }}>Date</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        currentTask &&
                                        currentTask.taskSessions.map((session) => {
                                            return (
                                                <tr key={session.id}>
                                                    <td>{hoursToTimeDisplay(session.minutes / 60)}</td>
                                                    <td>{moment(session.dateCompleted).format("MMM D")}</td>
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