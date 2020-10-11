import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { loadDetailedView } from '../../../thunks/premiumStatsThunk'
import DetailedViewPieChart from '../charts/detailed-view-pie-chart'
import DetailedViewBarChart from '../charts/detailed-view-bar-chart'
import DetailedViewDescription from './DetailedViewDescription'
//import DetailedViewSelectRow from './DetailedViewSelectRow'
import { Col } from 'react-bootstrap'

const DetailedView = ({ dispatch, selectedTask }) => {

    useEffect(() => {
        dispatch(loadDetailedView())
    }, [])

    return (
        <Col onClick={() => console.log('redirect')} className="boxCol" id="quickT" md={12}>
            <div style={{ padding: '0px', margin: '0px' }} className="innerBoxCol">
                <div className="detailed-view">
                    <DetailedViewDescription selectedTask={selectedTask} />
                    <div className="detailed-view__bar-chart">
                        <DetailedViewBarChart selectedTask={selectedTask} />
                    </div>
                    <div className="detailed-view__pie-chart">
                        <DetailedViewPieChart selectedTask={selectedTask} />
                    </div>
                </div>
            </div>
        </Col>

    )
}

// const mapStateToProps = (state) => {
//     return {
//         selectedTask: state.premiumStats.selectedTask
//     }
// }

export default connect()(DetailedView)