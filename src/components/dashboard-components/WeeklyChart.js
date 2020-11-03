import React, { useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { loadHoursWeek } from '../../thunks/chartThunk'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { AiFillFire } from 'react-icons/ai'
import ReactEcharts from 'echarts-for-react'
import { AnimatedList } from 'react-animated-list';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const WeeklyChart = ({ charts, dispatch, streak }) => {

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
        <div>
            <div className="toggleContainer">
                <div>
                    {
                        parseInt(streak) > 1 &&
                        <Tippy content={streak + ' Consecutive Days Studying'}
                            placement="top"
                            allowHTML={true}
                            animateFill={false}
                        >
                            <div>
                                <div className="toggleContainer__streak">
                                    <AiFillFire className="toggleContainer__streak__icon"
                                        style={{ fontSize: '20px' }}
                                    />
                                    {streak + ' Days'}
                                </div>
                            </div>
                        </Tippy>

                    }


                </div>

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
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        charts: state.charts,
        streak: state.charts.streak
    }
}

export default connect(mapStateToProps)(WeeklyChart)