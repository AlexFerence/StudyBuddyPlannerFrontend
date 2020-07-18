import React from 'react'
import { connect } from 'react-redux'
import Counter from './Timer'
import 'react-circular-progressbar/dist/styles.css';
import { FaEdit, FaCalendarAlt } from 'react-icons/fa'
import { Row, Col } from 'react-bootstrap'
import moment from 'moment'

const TaskDisplay = ({ task, turnOnEditing, getClassColor }) => {

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
                    <div>
                    <FaCalendarAlt /> Due: {returnParsedMoment(task.dueDate)}
                    </div>
                    </Col>
                    <Col>
                    <Counter />
                    </Col>
                    
                </Row>
                <div>
                    <div className="multiLine">{task.description}</div>
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