import React, { useEffect, useState } from 'react'
import ReactEcharts from 'echarts-for-react'
//import { getGithubCalendar } from '../../../thunks/friendThunk'
import { connect } from 'react-redux'
import echarts from 'echarts'
import moment from 'moment'
import { loadNewUsers } from '../../thunks/adminStatsThunk'

const NewUsersCal = ({ dispatch, githubCalendarData, semesters = [] }) => {

    const currentSemester = semesters?.find((semester) => semester.active === 1)

    const [newUsers, setNewUsers] = useState([])

    const minsToHours = (m) => {
        const hours = Math.floor(m / 60)
        const mins = Math.floor(m % 60)
        if (hours >= 1) {
            return (hours + 'hrs., ' + mins + 'min.')
        }
        else {
            return (mins + 'min.')
        }
    }

    const getNewUsersData = async () => {
        const newUsersData = await dispatch(loadNewUsers())
        let temp = []
        newUsersData.forEach((item) => {
            temp.push([
                echarts.format.formatTime('yyyy-MM-dd', item.date1),
                item.value1
            ]);
        })
        setNewUsers(temp)
    }

    useEffect(() => {
        // get data from 
        getNewUsersData()
    }, [])

    // function getVirtualData() {
    //     var data = [];
    //     githubCalendarData.forEach((item) => {
    //         data.push([
    //             echarts.format.formatTime('yyyy-MM-dd', item.date1),
    //             item.value1
    //         ]);
    //     })

    //     return data;
    // }


    return (
        <ReactEcharts
            style={{ height: '300px' }}
            option={{
                tooltip: {
                    // trigger: 'item',
                    // formatter: function (params) {
                    //     let rez = ''
                    //     rez = '<span>'
                    //         + moment(params.data[0]).format('MMM D') + ': '
                    //         + minsToHours(params.data[1]) +
                    //         '</span>';
                    //     return rez

                    // }
                },
                visualMap: {
                    pieces: [
                        // Range of a piece can be specified by property min and max,
                        // Label of the piece can be specified.
                        { min: 0, max: 60, label: '1hr' },
                        { min: 60, max: 120, label: '2hr' },
                        { min: 120, max: 180, label: '3hr' },
                        { min: 180, max: 240, label: '4hr+' },
                    ],
                    type: 'piecewise',
                    orient: 'horizontal',
                    left: 'center',
                    top: 45,
                    textStyle: {
                        color: '#000'
                    },
                    inRange: { color: ['#EBEDF0', '#30C730'] }
                },
                calendar: {
                    top: 110,
                    left: 60,
                    right: 60,
                    cellSize: ['auto', 20],

                    range: [moment(currentSemester?.startDate).format('YYYY-MM-DD'),
                    moment(currentSemester?.endDate).format('YYYY-MM-DD')],
                    itemStyle: {
                        borderWidth: 0.5
                    },
                    yearLabel: { show: false }
                },
                series: {
                    type: 'heatmap',
                    coordinateSystem: 'calendar',
                    data: newUsers
                }
            }}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        githubCalendarData: state.friends.githubCalendarData,
        semesters: state.profile.semesters
    }
}

export default connect(mapStateToProps)(NewUsersCal)