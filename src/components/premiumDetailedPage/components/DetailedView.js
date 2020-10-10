import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { loadDetailedView } from '../../../thunks/premiumStatsThunk'
import DetailedViewPieChart from '../charts/detailed-view-pie-chart'
import DetailedViewBarChart from '../charts/detailed-view-bar-chart'
import DetailedViewDescription from './DetailedViewDescription'


const DetailedView = ({ dispatch, selectedTask }) => {

    useEffect(() => {
        dispatch(loadDetailedView())
    }, [])

    return (
        <React.Fragment>
            <div className="detailed-view__select-row">

            </div>
            <div className="detailed-view">
                <DetailedViewDescription selectedTask={selectedTask} />
                <div className="detailed-view__bar-chart">
                    <DetailedViewBarChart />
                </div>
                <div className="detailed-view__pie-chart">
                    <DetailedViewPieChart />
                </div>
            </div>
        </React.Fragment>

    )
}

const mapStateToProps = (state) => {
    return {
        selectedTask: state.premiumStats.selectedTask
    }
}

export default connect(mapStateToProps)(DetailedView)