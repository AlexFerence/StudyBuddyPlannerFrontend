import React, { useEffect, useState } from 'react'
import { loadAdminStats } from '../../thunks/adminStatsThunk'
import { connect } from 'react-redux'
import CountUp from 'react-countup'

const SupportLog = ({ dispatch }) => {

    var [supportLog, setSupportLog] = useState([])

    const loadAdminData = async () => {

        var data = await dispatch(loadAdminStats())

        console.log(data.responseItems)
        const list = data.responseItems
        if (data) {
            setSupportLog(data)
        }
    }

    useEffect(() => {
        loadAdminData()
    }, [])

    return (
        <div id="overview-bar">
            {
                supportLog.map((log) => (
                    <div>
                        <div>{log.userEmail}</div>
                        <div>{log.description}</div>
                    </div>
                ))
            }
        </div>
    )
}

export default connect()(SupportLog)