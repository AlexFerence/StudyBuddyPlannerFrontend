import React, { useState } from 'react'
import { connect } from 'react-redux'
import Counter from './Timer'
import 'react-circular-progressbar/dist/styles.css';
import { FaEdit, FaCalendarAlt, FaGraduationCap, FaPencilAlt } from 'react-icons/fa'
import { IoMdTime } from 'react-icons/io'
import { Row, Col } from 'react-bootstrap'
import moment from 'moment'
import Select from 'react-select';
import TimeInput from './TaskTimeInput'

const TaskDisplay = ({ task, turnOnEditing, getClassColor, getClassName, isRunning }) => {

    const [timerSetting, setTimerSetting] = useState({ value: 'Timer', label: 'Timer' })

    const returnParsedMoment = (date) => {
        var momentDay = moment(date)
        return momentDay.format("MMM D")
    }


    return (
        <div className="display-task">
            <div className="display-task-header" style={{ backgroundColor: getClassColor(task.subjectId)}}>
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
                    <button>Mark as Complete</button>
                    
                    </Col>
                    <Col>
                    <Select
                    className="timerSelect"
                    value={timerSetting}
                    onChange={val => setTimerSetting(val)}
                    placeholder="Type..."
                    isDisabled={isRunning}
                    options={[
                        { value: 'Timer', label: 'Timer' },
                        { value: 'Stopwatch', label: 'Stopwatch' },
                        { value: 'Time Input', label: 'Time Input' },
                    ]}
                    />
                    { timerSetting.value === 'Timer' && <Counter task={task} />}
                    { timerSetting.value === 'Stopwatch'}
                    { timerSetting.value === 'Time Input' && <TimeInput color={getClassColor(task.subjectId)} /> }
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
        isRunning: state.running.isRunning
    }
}

export default connect(mapStateToProps)(TaskDisplay)