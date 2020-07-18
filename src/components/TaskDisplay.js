import React from 'react'
import { connect } from 'react-redux'
import Counter from './Timer'
import 'react-circular-progressbar/dist/styles.css';
import { FaEdit } from 'react-icons/fa'

const TaskDisplay = ({ task, turnOnEditing, getClassColor }) => {
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
                <div className="">
                    <Counter />
                </div>
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