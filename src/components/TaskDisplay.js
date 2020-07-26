import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import Counter from './Timer'
import 'react-circular-progressbar/dist/styles.css';
import { FaEdit, FaCalendarAlt, FaGraduationCap, FaPencilAlt, FaCheckDouble, FaCheck } from 'react-icons/fa'
import { IoMdTime, IoMdCheckmark } from 'react-icons/io'
import { Row, Col } from 'react-bootstrap'
import moment from 'moment'
import Select from 'react-select';
import TimeInput from './TaskTimeInput'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

const TaskDisplay = ({ task, turnOnEditing, getClassColor, getClassName, isRunning, paused, setCurrentTask }) => {

    const [timerSetting, setTimerSetting] = useState({ value: 'Timer', label: 'Timer' })

    const messagesEndRef = React.createRef()

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(scrollToBottom, [task.taskSessions]);

    useEffect(() => {
        scrollToBottom()
    }, [task.taskSessions])

    //scrolls to bottom
    

    const returnParsedMoment = (date) => {
        var momentDay = moment(date)
        return momentDay.format("MMM D")
    }

    const renderTooltipDone = (props, display) => {
        return (
            <Tooltip id="button-tooltip" {...props}>
                Done
            </Tooltip>
        );
    }

    return (
        <div className="display-task">
            <div className="display-task-header" style={{ backgroundColor: getClassColor(task.subjectId) }}>
                <span>{task.title}</span>
                <div>
                    <button
                        className="edit"
                        onClick={() => {
                            turnOnEditing()
                        }}
                    ><FaEdit /></button>
                </div>
            </div>
            <div className="display-task-body">
                <Row>
                    <Col>
                        <div className="d-flex align-items-end info">
                            <span className="calendarIcon"><FaCalendarAlt /></span>  Due: {returnParsedMoment(task.dueDate)}
                        </div>
                        <div className="d-flex align-items-end info">
                            <span className="calendarIcon"><FaGraduationCap /></span>  Class: {getClassName(task.subjectId)}
                        </div>
                        <div className="d-flex align-items-end info">
                            <span className="calendarIcon"><IoMdTime /></span>  Total: {task.totalTime}mins
                    </div>
                        <div className="d-flex align-items-end info">
                            <span className="calendarIcon"><FaPencilAlt /></span>  Notes:
                    </div>
                        <div>
                            <div className="multiLine">{task.description}</div>
                        </div>
                        <span className="bold">Sessions:</span>
                        <div className="sessionsTable">
                        <table>
                        <tr>
                            <th>Minutes</th>
                            <th>Date</th>
                        </tr>
                        
                        {
                            task.taskSessions.map((session) => {
                                return (
                                    <tr key={session.id}>
                                        <td>{session.minutes}</td>
                                        <td className="">{moment(session.dateCompleted).format("MMM D")}</td>
                                    </tr>
                                )
                            })
                        }
                        <div ref={messagesEndRef} />
                    </table>   

                        </div>


                        <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltipDone}
                        >
                            <button className="but complete"><FaCheck /> Completed</button>
                        </OverlayTrigger>


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
                        color={getClassColor(task.subjectId)} 
                        task={task} 
                        setCurrentTask={setCurrentTask}
                        />}
                        {timerSetting.value === 'Stopwatch'}
                        {timerSetting.value === 'Time Input' &&
                            <TimeInput
                                setCurrentTask={setCurrentTask}
                                color={getClassColor(task.subjectId)}
                                task={task}
                            />}
                    </Col>
                </Row>
                <div>
                    
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        subjects: state.subjects,
        isRunning: state.running.isRunning,
        paused: state.running.paused
    }
}

export default connect(mapStateToProps)(TaskDisplay)