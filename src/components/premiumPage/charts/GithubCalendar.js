import React from 'react'
import ReactEcharts from 'echarts-for-react'

const LandingBarChart = () => {
    return (
        <ReactEcharts
            option={{
                title: {
                    top: 30,
                    left: 'center',
                    text: '2016年某人每天的步数'
                },
                tooltip: {},
                visualMap: {
                    min: 0,
                    max: 10000,
                    type: 'piecewise',
                    orient: 'horizontal',
                    left: 'center',
                    top: 65,
                    textStyle: {
                        color: '#000'
                    }
                },
                calendar: {
                    top: 120,
                    left: 30,
                    right: 30,
                    cellSize: ['auto', 13],
                    range: '2016',
                    itemStyle: {
                        borderWidth: 0.5
                    },
                    yearLabel: { show: false }
                },
                series: {
                    type: 'heatmap',
                    coordinateSystem: 'calendar',
                    data: getVirtulData(2016)
                }
            }}
        />
    )
}

export default LandingBarChart
