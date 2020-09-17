import React, { useEffect, useState } from 'react'
import { loadAdminStats } from '../../thunks/adminStatsThunk'
import { connect } from 'react-redux'

const OverviewBar = ({ dispatch }) => {

    var [totalStudents, setTotalSudents] = useState(0)
    var [totalUnis, setTotalUnis] = useState(0)
    var [tasksCompleted, setTasksCompleted] = useState(0)
    var [minutesSpent, setMinutesSpent] = useState(0)

    var data = []

    const loadAdminData = async () => {
        var data = await dispatch(loadAdminStats())
        console.log(data.responseItems)
        const list = data.responseItems
        if (data?.responseItems?.length > 3) {
            setTotalSudents(list[0]?.value1)
            setTasksCompleted(data?.responseItems[4]?.value1)
            setTotalUnis(data?.responseItems[3]?.value1)
            setMinutesSpent(data?.responseItems[5]?.value1)
        }
    }

    useEffect(() => {
        loadAdminData()
        //load the data here
    }, [])

    return (
        <div id="overview-bar">
            <div className="overview-bar__item">
                <div className="overview-bar__item__num">{totalUnis}</div>
                <div className="overview-bar__item__subtext">Different Universities</div>
            </div>
            <div className="overview-bar__item">
                <div className="overview-bar__item__num">{tasksCompleted}</div>
                <div className="overview-bar__item__subtext">Tasks Completed</div>
            </div>
            <div className="overview-bar__item">
                <div className="overview-bar__item__num">{minutesSpent}</div>
                <div className="overview-bar__item__subtext">Minutes Studying</div>
            </div>
        </div>
    )
}

export default connect()(OverviewBar)