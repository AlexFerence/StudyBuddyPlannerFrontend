import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { loadDetailedView } from '../../../thunks/premiumStatsThunk'
import DetailedViewPieChart from '../charts/detailed-view-pie-chart'
import moment from 'moment'

const DetailedView = ({ dispatch, selectedTask }) => {

    useEffect(() => {
        dispatch(loadDetailedView())
    }, [])

    return (
        <div className="detailed-view">
            <div className="detailed-view__description">
                <div>Title: {selectedTask.title}</div>
                <div>Task Type: {selectedTask.taskType}</div>
                <div>Title: {selectedTask.description}</div>
                <div>Due Date: {moment(selectedTask.dueDate).format('MMMM d, yyyy')}</div>

            </div>
            <div className="detailed-view__bar-chart">
                bar chart
            </div>
            <div className="detailed-view__pie-chart">
                <DetailedViewPieChart />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        selectedTask: state.premiumStats.selectedTask
    }
}

export default connect(mapStateToProps)(DetailedView)