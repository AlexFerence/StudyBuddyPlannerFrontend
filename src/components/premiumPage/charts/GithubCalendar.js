import React from 'react'
import ReactEcharts from 'echarts-for-react'
import echarts from 'echarts'
import moment from 'moment'

const LandingBarChart = () => {

    function getVirtualData(year) {
        year = year || '2017';
        var date = +echarts.number.parseDate(year + '-01-01');
        var end = +echarts.number.parseDate((+year + 1) + '-01-01');
        var dayTime = 3600 * 24 * 1000;
        var data = [];
        for (var time = date; time < end; time += dayTime) {
            data.push([
                echarts.format.formatTime('yyyy-MM-dd', time),
                Math.floor(Math.random() * 10000)
            ]);
        }
        return data;
    }


    return (
        <ReactEcharts
            option={{
                tooltip: {},
                visualMap: {
                    min: 0,
                    max: 9500,
                    type: 'piecewise',
                    orient: 'horizontal',
                    left: 'center',
                    top: 65,
                    textStyle: {
                        color: '#000'
                    },
                    inRange: ['#ffffff', '#555555']

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
                    data: getVirtualData(2016)
                }
            }}
        />
    )
}

export default LandingBarChart
