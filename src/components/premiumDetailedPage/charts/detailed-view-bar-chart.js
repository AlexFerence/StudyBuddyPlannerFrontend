import React from 'react'
import { connect } from 'react-redux'
import ReactEcharts from 'echarts-for-react'
import moment from 'moment'

const DetailedViewBarChart = ({ selectedTask }) => {

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
    if (selectedTask.sessionItems.length === 1) {
        return (
            <div className="one-day-spent">

                <span className="one-day-spent__time">
                    {minsToHours(selectedTask.sessionItems[0].sessionMinutes)}
                </span>
                <span className="one-day-spent__desc">
                    Was spent {selectedTask.sessionItems[0].dateDifference} days
                before the due date on {moment(selectedTask.sessionItems[0].dateCompleted).format('MMM d')}
                </span>
            </div>
        )
    }

    return (
        <ReactEcharts
            style={{ height: '200px', padding: '10px' }}
            option={{
                grid: {
                    bottom: 20,
                    top: 8,
                    right: 0,
                    left: 45
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        let rez = ''
                        //console.log(params)
                        if (params[0].data.name < 1) {
                            rez = '<span>' + Math.abs(params[0].data.name) + ' days untill due date: ' + minsToHours(params[0].data.value) + '</span>';
                            return rez;
                        }
                        else {
                            rez = '<span>' + params[0].data.name + ' days after due date: ' + minsToHours(params[0].data.value) + '</span>';
                            return rez;
                        }
                        //return rez
                    }
                },
                xAxis: {
                    // name: 'Days Till Due',
                    // nameLocation: 'middle',
                    // nameGap: 20,
                    type: 'category',
                    boundaryGap: true,
                    data: selectedTask.sessionItems?.map((session) => {
                        if (session.dateDifference > 0) {
                            return (-1 * session.dateDifference)
                        }
                        else {
                            return (Math.abs(session.dateDifference))
                        }
                    })
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}'
                    },
                    name: 'Minutes',
                    nameLocation: 'middle',
                    nameGap: 35
                },
                series: [{
                    data: selectedTask.sessionItems?.map((session) => {
                        return (
                            {
                                name: session.dateDifference,
                                value: session.sessionMinutes,
                                itemStyle: {
                                    color: (session.dateDifference < 1 ? selectedTask.subjectColor : '#bcbcbc')
                                },
                                color: selectedTask.subjectColor,

                                itemStyle: { color: selectedTask.subjectColor },
                            }
                        )
                    }
                    ),
                    lineStyle: { color: selectedTask.subjectColor },
                    type: 'line',
                    areaStyle: {
                        color: selectedTask.subjectColor
                    }
                }]
            }}
        />
    )

}

// const mapStateToProps = (state) => {
//     return {
//         selectedTask: state.premiumStats.selectedTask
//     }
// }

export default connect()(DetailedViewBarChart)

