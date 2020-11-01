import React, { useEffect } from 'react'
import ReactEcharts from 'echarts-for-react'
import { getGithubCalendar } from '../../../thunks/friendThunk'
import { connect } from 'react-redux'
import echarts from 'echarts'
import moment from 'moment'

const LandingBarChart = ({ dispatch, githubCalendarData, semesters }) => {

    const currentSemester = semesters.find((semester) => semester.active === 1)

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

    useEffect(() => {
        dispatch(getGithubCalendar())
        console.log(githubCalendarData)
    }, [])

    function getVirtualData() {
        var data = [];
        githubCalendarData.forEach((item) => {
            data.push([
                echarts.format.formatTime('yyyy-MM-dd', item[0]),
                item[1]
            ]);
        })

        return data;
    }


    return (
        <ReactEcharts
            style={{ height: '300px' }}
            tooltip
            option={{
                tooltip: {
                    trigger: 'item',
                    formatter: function (params) {
                        let rez = ''
                        rez = '<span>'
                            + moment(params.data[0]).format('MMM d') + ': '
                            + minsToHours(params.data[1]) +
                            '</span>';
                        return rez

                    }
                },
                visualMap: {
                    min: 0,
                    max: 200,
                    type: 'piecewise',
                    orient: 'horizontal',
                    left: 'center',
                    top: 65,
                    textStyle: {
                        color: '#000'
                    },
                    inRange: { color: ['#FDCFCC', '#fb4033'] }
                },
                calendar: {
                    top: 120,
                    left: 30,
                    right: 30,
                    cellSize: ['auto', 13],

                    range: [moment(currentSemester.startDate).format('YYYY-MM-DD'),
                    moment(currentSemester.endDate).format('YYYY-MM-DD')],
                    itemStyle: {
                        borderWidth: 0.5
                    },
                    yearLabel: { show: false }
                },
                series: {
                    type: 'heatmap',
                    coordinateSystem: 'calendar',
                    data: getVirtualData()
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

export default connect(mapStateToProps)(LandingBarChart)