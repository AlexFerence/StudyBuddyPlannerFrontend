import React from 'react'
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react'

const WeeklyAverage = ({ charts }) => {
    const hoursToTimeDisplay = (h) => {
        var hours = Math.floor(h)
        var decimalMins = (h - hours) * 60
        var returnMins = Math.floor(decimalMins)
        if (decimalMins < 10) {
            returnMins = "0" + returnMins
        }
        return (hours + ":" + returnMins)
    }

    return (
        <ReactEcharts
            option={{
                title: {
                    text: "Average Per Day of Week",
                    x: 'center',
                    top: 20,
                    textStyle: {
                        fontFamily: 'Helvetica',
                        fontWeight: 100

                    }
                },
                tooltip: {
                    trigger: 'item',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter: function (params) {
                        let rez = '<span>' + params[0].axisValue + ' ' + '</span>';
                        //console.log(params); //quite useful for debug
                        params.forEach(item => {
                            //console.log(item); //quite useful for debug
                            var xx = '<span>' + hoursToTimeDisplay(item.data) + '' + '</span>'
                            rez += xx;
                        });
                        return rez;
                    }
                },
                xAxis: {
                    type: 'category',
                    data: charts.averageByDayOfWeekxaxis
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
                    data: charts.averageByDayOfWeek,
                    type: 'bar'
                }]
            }}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        charts: state.charts
    }
}

export default connect(mapStateToProps)(WeeklyAverage)