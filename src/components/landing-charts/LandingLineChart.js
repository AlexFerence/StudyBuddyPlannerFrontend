import React from 'react'
import ReactEcharts from 'echarts-for-react'

const LandingLineChart = () => {
    return (
        <ReactEcharts
            option={{
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisLine: {
                        lineStyle: {
                            color: '#FFF'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#FFF'
                        }
                    },
                    name: 'hours',
                    nameLocation: 'middle',
                    nameGap: 35
                },
                series: [{
                    data: [4, 5, 6, 7, 8, 11, 13],
                    type: 'line'
                },
                {
                    color: '#add8e6',
                    data: [3, 2, 4, 5, 6, 8, 9],
                    type: 'line'
                }
                ]
            }}
        />
    )
}

export default LandingLineChart
