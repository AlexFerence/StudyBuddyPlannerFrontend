import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Counter from './Timer'
import 'react-circular-progressbar/dist/styles.css';
import { FaEdit, FaCalendarAlt, FaGraduationCap, FaPencilAlt, FaCheckDouble, FaCheck } from 'react-icons/fa'
import { IoMdTime, IoMdCheckmark } from 'react-icons/io'
import { Row, Col } from 'react-bootstrap'
import moment from 'moment'
import Select from 'react-select';
import TimeInput from './TaskTimeInput'
import Stopwatch from './Stopwatch'
//import { OverlayTrigger, Tooltip } from 'react-bootstrap'
//import { getSessionsThunk } from '../thunks/sessionsThunk'
import { getClassColor, getClassName } from '../thunks/subjectThunk'
//import { getTask } from '../thunks/taskThunk';
import PerfectScrollbar from 'react-perfect-scrollbar'

const TaskDisplay = ({ currentTask, editingOn, isRunning, paused, setCurrentTask, dispatch }) => {

    const [timerSetting, setTimerSetting] = useState({ value: 'Timer', label: 'Timer' })

    const messagesEndRef = React.createRef()

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
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

    const getTitle = async (subjId) => {
        try {
            var title = await dispatch(getClassName(subjId))
            return title
        } catch (e) {
            console.log(e)
        }
    }


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

    //scrolls to bottom


    const returnParsedMoment = (date) => {
        var momentDay = moment(date)
        return momentDay.format("MMM D")
    }



    // const renderTooltipDone = (props, display) => {
    //     return (
    //         <Tooltip id="button-tooltip" {...props}>
    //             Done
    //         </Tooltip>
    //     );
    // }

    return (
        <div className="display-task">
            <div className="display-task-header" style={{ backgroundColor: currentTask.color }}>
                <span>{currentTask.title}</span>
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
                    <Col>
                        <div className="d-flex align-items-end info">
                            <span className="calendarIcon"><FaCalendarAlt /></span>  Due: {currentTask.dueDate}
                        </div>
                        <div className="d-flex align-items-end info">
                            <span className="calendarIcon"><FaGraduationCap /></span>  Class: {currentTask.subjectTitle}
                        </div>
                        <div className="d-flex align-items-end info">
                            <span className="calendarIcon"><IoMdTime /></span>  Total: {currentTask.totalTime}mins
                    </div>
                        <div className="d-flex align-items-end info">
                            <span className="calendarIcon"><FaPencilAlt /></span>  Notes:
                    </div>
                        <div>
                            <div className="multiLine">{currentTask.description}</div>
                        </div>

                        <button className="but complete"><FaCheck className="green" /> Completed</button>



                    </Col>
                    <Col>
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
                    <span className="bold">Sessions:</span>
                    <div className="sessionsTable">
                    <PerfectScrollbar>
                        <table>
                            <thead>
                            <tr>
                                <th>Minutes</th>
                                <th>Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            
                            { 
                                currentTask &&
                                    currentTask.taskSessions.map((session) => {
                                        return (
                                            <tr key={session.id}>
                                                <td>{session.minutes}</td>
                                                <td className="">{moment(session.dateCompleted).format("MMM D")}</td>
                                            </tr>
                                        )
                                    })
                            }
                            
                            <tr ref={messagesEndRef}>
                            </tr>
                            </tbody>
                        </table>
                        </PerfectScrollbar>
                    </div>
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