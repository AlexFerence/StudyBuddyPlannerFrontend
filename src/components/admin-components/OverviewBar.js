import React, { Fragment, useEffect, useState } from 'react'
import { loadAdminStats } from '../../thunks/adminStatsThunk'
import { connect } from 'react-redux'
import CountUp from 'react-countup'

const OverviewBar = ({ dispatch }) => {
    var [dau, setDau] = useState(0)
    var [mau, setMau] = useState(0)
    var [totalUsers, setTotalUsers] = useState(0)
    var [tenHrActivityRatio, setTenHrActivityRatio] = useState(0)
    var [zeroToTenHrActivityRatio, setZeroToTenHrActivityRatio] = useState(0)
    var [daumauRatio, setDaumauRatio] = useState(0)
    var [percentUsersAddedTasksAndTime, setPercentUsersAddedTasksAndTime] = useState(0)
    var [percentUsersAddedSubjects, setPercentUsersAddedSubjects] = useState(0)
    var [numberOfUniversities, setNumberOfUniversities] = useState(0)

    const loadAdminData = async () => {
        var data = await dispatch(loadAdminStats())
        console.log('data')
        console.log(data)
        if (true) {
            setMau(data.mau)
            setDau(data.dau)
            setTotalUsers(data.numberOfUsers)
            setTenHrActivityRatio(data.tenHrActivityRatio)
            setZeroToTenHrActivityRatio(data.zeroToTenHrActivityRatio)
            setDaumauRatio(data.daumauRatio)
            setPercentUsersAddedTasksAndTime(data.percentUsersAddedTasksAndTime)
            setNumberOfUniversities(data.numberOfUniversities)
            setPercentUsersAddedSubjects(data.percentUsersAddedSubjects)
        }
    }

    useEffect(() => {
        loadAdminData()
        //load the data here
    }, [])

    const toPercent = (num) => {
        return ((num * 100).toFixed(1))
    }

    return (
        <Fragment>
            <div id="overview-bar">

                <div className="overview-bar__item">
                    <div className="overview-bar__item__num">
                        {toPercent(dau)}%
                    </div>
                    <div className="overview-bar__item__subtext">DAU</div>
                </div>
                <div className="overview-bar__item">
                    <div className="overview-bar__item__num">
                        {toPercent(mau)}%
                    </div>
                    <div className="overview-bar__item__subtext">MAU</div>
                </div>
                <div className="overview-bar__item">
                    <div className="overview-bar__item__num">
                        {toPercent(daumauRatio)}%
                    </div>
                    <div className="overview-bar__item__subtext">DAU/MAU ratio</div>
                </div>
            </div>
            <div id="overview-bar">
                <div className="overview-bar__item">
                    <div className="overview-bar__item__num">
                        {toPercent(zeroToTenHrActivityRatio)}%
                    </div>
                    <div className="overview-bar__item__subtext">0hr - 10hr % active</div>
                </div>
                <div className="overview-bar__item">
                    <div className="overview-bar__item__num">
                        {toPercent(tenHrActivityRatio)}%
                    </div>
                    <div className="overview-bar__item__subtext">10hr+ % active</div>
                </div>
                <div className="overview-bar__item">
                    <div className="overview-bar__item__num">
                        {numberOfUniversities}
                    </div>
                    <div className="overview-bar__item__subtext"># Universities</div>
                </div>

            </div>
            <div id="overview-bar">
                <div className="overview-bar__item">
                    <div className="overview-bar__item__num">
                        {totalUsers}
                    </div>
                    <div className="overview-bar__item__subtext">Total Users</div>
                </div>
                <div className="overview-bar__item">
                    <div className="overview-bar__item__num">
                        {toPercent(percentUsersAddedTasksAndTime)}%
                    </div>
                    <div className="overview-bar__item__subtext">% w TT</div>
                </div>
                <div className="overview-bar__item">
                    <div className="overview-bar__item__num">
                        {toPercent(percentUsersAddedSubjects)}%
                    </div>
                    <div className="overview-bar__item__subtext">% w Subj</div>
                </div>

            </div>
        </Fragment>
    )
}

export default connect()(OverviewBar)