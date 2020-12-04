import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react'
import CustomChildrenOverlay from '../CustomChildrenOverlay'
import { Link } from 'react-router-dom';
import GraphCoverUp from '../shared/GraphCoverUp';

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

    const timeExists = charts.averageByDayOfWeek.find((time) => time > 0)

    return (
        <Fragment>
            { timeExists ?
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
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            },
                            formatter: function (params) {
                                //console.log('params')
                                let rez = '<span>' + params[0].axisValue + " " + '</span>';
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
                :
                <GraphCoverUp />
            }
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        charts: state.charts
    }
}

export default connect(mapStateToProps)(WeeklyAverage)