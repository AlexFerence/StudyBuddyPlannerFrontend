import React, { useEffect } from 'react'
import { loadAdminStats } from '../../thunks/adminStatsThunk'
import { connect } from 'react-redux'

const OverviewBar = ({ dispatch }) => {

    var data = []

    const loadAdminData = async () => {
        await loadAdminStats()
    }

    useEffect(() => {
        loadAdminData()
        //load the data here
    }, [])

    return (
        <div className="overview-bar">
            <div className="overview-bar__item">
                <div className="overview-bar__item__num">10</div>
                <div className="overview-bar__item__subtext">Total students</div>
            </div>
            <div className="overview-bar__item">
                <div className="overview-bar__item__num">5</div>
                <div className="overview-bar__item__subtext">Different universities</div>
            </div>
            <div className="overview-bar__item">
                <div className="overview-bar__item__num">10000</div>
                <div className="overview-bar__item__subtext">Tasks made</div>
            </div>
        </div>
    )
}

export default connect()(OverviewBar)