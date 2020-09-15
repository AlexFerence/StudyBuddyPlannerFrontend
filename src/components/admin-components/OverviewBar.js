import React, { useEffect, useState } from 'react'
import { loadAdminStats } from '../../thunks/adminStatsThunk'
import { connect } from 'react-redux'

const OverviewBar = ({ dispatch }) => {

    var [totalStudents, setTotalSudents] = useState(0)
    var [totalUnis, setTotalUnis] = useState(0)
    var [stuWSubj, setStuWSubj] = useState(0)

    var data = []

    const loadAdminData = async () => {
        var data = await dispatch(loadAdminStats())
        console.log(data.responseItems)
        if (data?.responseItems?.length === 4) {
            setTotalSudents(data?.responseItems[0]?.value1)
            setStuWSubj(data?.responseItems[1]?.value1)
            setTotalUnis(data?.responseItems[3]?.value1)
        }
    }

    useEffect(() => {
        loadAdminData()
        //load the data here
    }, [])

    return (
        <div className="overview-bar">
            <div className="overview-bar__item">
                <div className="overview-bar__item__num">{totalStudents}</div>
                <div className="overview-bar__item__subtext">Total students</div>
            </div>
            <div className="overview-bar__item">
                <div className="overview-bar__item__num">{totalUnis}</div>
                <div className="overview-bar__item__subtext">Different universities</div>
            </div>
            <div className="overview-bar__item">
                <div className="overview-bar__item__num">{stuWSubj}</div>
                <div className="overview-bar__item__subtext">Students with subjects</div>
            </div>
        </div>
    )
}

export default connect()(OverviewBar)