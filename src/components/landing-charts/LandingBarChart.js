import React from 'react'
import ReactEcharts from 'echarts-for-react'

const LandingBarChart = () => {
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
                    data: [4, 5, 3.5, 5.5, 2, 3, 6],
                    type: 'bar'
                }]
            }}
        />
    )
}

export default LandingBarChart
