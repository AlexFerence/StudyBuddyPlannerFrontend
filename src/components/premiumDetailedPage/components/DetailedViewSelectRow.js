import React from 'react'
import { connect } from 'react-redux'

const DetailedViewSelectRow = ({ selectedTask, completedTasks }) => {
    return (
        <div className="detailed-view__select-row">
            <div>select1</div>
            <div>select2</div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        selectedTask: state.premiumStats.selectedTask,
        completedTasks: state.premiumStats.completedTasks
    }
}
export default connect(mapStateToProps)(DetailedViewSelectRow)