import React, { useEffect, useState } from 'react'
import { loadAdminStats } from '../../thunks/adminStatsThunk'
import { connect } from 'react-redux'
import CountUp from 'react-countup'

const AdminBar = ({ dispatch }) => {

    var [totalStudents, setTotalSudents] = useState(0)
    var [totalUnis, setTotalUnis] = useState(0)
    var [tasksCompleted, setTasksCompleted] = useState(0)
    var [minutesSpent, setMinutesSpent] = useState(0)
    var [studentsWithSubj, setStudentsWithSubj] = useState(0)
    var [studentsWithTT, setStudentsWithTT] = useState(0)


    var data = []

    const loadAdminData = async () => {
        var data = await dispatch(loadAdminStats())
        const list = data.responseItems
        console.log(data)
        if (true) {
            setTotalSudents(data.numberOfUsers)
            setTasksCompleted(data?.mau)
            setTotalUnis(data.dau)
            // setMinutesSpent(data?.responseItems[5]?.value1)
            // setStudentsWithSubj(data?.responseItems[1]?.value1)
            // setStudentsWithTT(data?.responseItems[2]?.value1)
        }
    }

    useEffect(() => {
        loadAdminData()
        //load the data here
    }, [])

    return (
        <div id="overview-bar">
            <div className="overview-bar__item">
                <div className="overview-bar__item__num">
                    <CountUp duration={4} end={totalStudents} />
                </div>
                <div className="overview-bar__item__subtext">Users</div>
            </div>
            <div className="overview-bar__item">
                <div className="overview-bar__item__num">
                    <CountUp duration={4} end={studentsWithSubj} />
                </div>
                <div className="overview-bar__item__subtext">Users With Subjects</div>
            </div>
            <div className="overview-bar__item">
                <div className="overview-bar__item__num">
                    <CountUp duration={3} end={studentsWithTT} /></div>

                <div className="overview-bar__item__subtext">Users With TT</div>
            </div>
        </div>
    )
}

export default connect()(AdminBar)