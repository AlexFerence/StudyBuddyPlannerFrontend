import React from 'react'
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react'

const DetailedViewBarChart = ({ selectedTask }) => {

    const minsToHours = (m) => {
        const hours = Math.floor(m / 60)
        const mins = Math.floor(m % 60)
        if (hours > 1) {
            return (hours + 'hrs., ' + mins + 'min.')
        }
        return (mins + 'min.')

    }

    return (
        <ReactEcharts
            option={{
                title: {
                    text: "Time Spent to Due Date",
                    x: 'center',
                    top: 20,
                    textStyle: {
                        fontFamily: 'Helvetica',
                        fontWeight: 100
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function (params) {
                        console.log(params)
                        let rez = '<span>' + params.data.name + ' days till due: ' + minsToHours(params.data.value) + '</span>';
                        return rez;
                    }
                },
                xAxis: {
                    type: 'category',
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}'
                    },
                    name: 'hours',
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
                                    color: (session.dateDifference < 1 ? '#fd1259' : 'red')
                                }
                            }
                        )
                    }
                    ),
                    type: 'bar'
                }]
            }}
        />
    )

}

const mapStateToProps = (state) => {
    return {
        selectedTask: state.premiumStats.selectedTask
    }
}

export default connect(mapStateToProps)(DetailedViewBarChart)

