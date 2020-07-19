import React from 'react'
import { connect } from 'react-redux'
import Counter from './Timer'
import 'react-circular-progressbar/dist/styles.css';
import { FaEdit, FaCalendarAlt, FaGraduationCap, FaPencilAlt } from 'react-icons/fa'
import { IoMdtime, IoMdTime } from 'react-icons/io'
import { Row, Col } from 'react-bootstrap'
import moment from 'moment'

const TaskDisplay = ({ task, turnOnEditing, getClassColor, getClassName }) => {

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
                    
                    </Col>
                    <Col>
                    <Counter task={task} />
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
        subjects: state.subjects
    }
}

export default connect(mapStateToProps)(TaskDisplay)