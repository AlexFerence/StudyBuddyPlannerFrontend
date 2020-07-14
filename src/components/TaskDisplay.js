import React from 'react'
import { connect } from 'react-redux'

const TaskDisplay = ({ task, subjects }) => {
    return (
        <div className="display-task">
            <div className="display-task-header">
                <span>{task.title}</span>
                <div>
                </div>
            </div>
            <div className="display-task-body">
                <p>{task.description}</p>
                
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

