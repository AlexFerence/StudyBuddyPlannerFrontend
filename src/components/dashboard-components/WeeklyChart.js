import React, { useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { loadHoursWeek } from '../../thunks/chartThunk'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import ReactEcharts from 'echarts-for-react'

const WeeklyChart = ({ charts, dispatch }) => {

    var [whichWeek, setWhichWeek] = useState(moment())

    const hoursToTimeDisplay = (h) => {
        var hours = Math.floor(h)
        var decimalMins = (h - hours) * 60
        var returnMins = Math.floor(decimalMins)
        if (decimalMins < 10) {
            returnMins = "0" + returnMins
        }
        return (hours + ":" + returnMins)
    }

    const goToNextWeek = () => {
        setWhichWeek(whichWeek.add(1, 'w'))
        dispatch(loadHoursWeek(whichWeek))
    }

    const goToPreviousWeek = () => {
        setWhichWeek(whichWeek.subtract(1, 'w'));
        dispatch(loadHoursWeek(whichWeek))
    }

    return (
        <>
            <div className="toggleContainer">
                <div className="toggle">
                    <FaAngleLeft
                        className="arrow"
                        onClick={goToPreviousWeek}
                    />
                    <FaAngleRight
                        className="arrow"
                        onClick={goToNextWeek}
                    />
                </div>
            </div>
            <div className="graph topRight">
                <ReactEcharts
                    option={{
                        title: {
                            text: "Week View",
                            x: 'center',
                            top: 0,
                            textStyle: {
                                fontFamily: 'Helvetica',
                                fontWeight: 100
                            },
                            subtext: moment(whichWeek).startOf('isoWeek').format("MMM D") + " - " + moment(whichWeek).endOf('isoWeek').format("MMM D")
                            ,

                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            },
                            formatter: function (params) {
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
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        yAxis: {
                            type: 'value',
                            axisLabel: {
                                formatter: '{value}'
                            },
                            name: 'Hours',
                            nameLocation: 'middle',
                            nameGap: 35
                        },
                        series: [{
                            data: charts.hoursWeekData,
                            type: 'bar'
                        }]
                    }}
                />
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        charts: state.charts
    }
}

export default connect(mapStateToProps)(WeeklyChart)