import React, { useEffect, useState } from 'react'
import { loadAdminStats, loadSupportLog } from '../../thunks/adminStatsThunk'
import { connect } from 'react-redux'
import CountUp from 'react-countup'

const SupportLog = ({ dispatch }) => {

    var [supportLog, setSupportLog] = useState([])

    const loadAdminData = async () => {

        var data = await dispatch(loadSupportLog())

        console.log(data)
        const list = data.responseItems
        if (data) {
            setSupportLog(data)
        }
    }

    useEffect(() => {
        loadAdminData()
    }, [])

    return (
        <div className='support-log'>
            <div className='support-log__title'>Support Log</div>
            {
                supportLog.slice(0).reverse().map((log, index) => (
                    <div className='support-log-item' key={index}>
                        <div className='support-log-item__email'>{log.userEmail}</div>
                        <div>{log.description}</div>
                    </div>
                ))
            }
        </div>
    )
}

export default connect()(SupportLog)