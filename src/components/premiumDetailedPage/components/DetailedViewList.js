import React from 'react'
import DetailedView from './DetailedView'
import { connect } from 'react-redux'

const DetailedViewList = ({ completedTasks }) => {
    var key = 0
    return (
        <React.Fragment>
            {
                completedTasks.map((selectedTask) => {
                    key++
                    return (
                        <DetailedView key={key} selectedTask={selectedTask} />
                    )
                })
            }
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        selectedTask: state.premiumStats.selectedTask,
        completedTasks: state.premiumStats.completedTasks
    }
}

export default connect(mapStateToProps)(DetailedViewList)