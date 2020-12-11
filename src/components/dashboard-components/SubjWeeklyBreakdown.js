import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react'
import CustomChildrenOverlay from '../CustomChildrenOverlay'
import GraphCoverUp from '../shared/GraphCoverUp';
import Select from 'react-select';

const SubjWeeklyBreakdown = ({ charts }) => {

    const [semester, setSemester] = useState({ value: 130, label: 'Fall 2020' })

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
        <Fragment>
            <div style={{ marginTop: '10px', marginLeft: '10px', marginRight: '10px' }}>
                <Select
                    value={semester}
                    onChange={val => setSemester(val)}
                    placeholder="Select Term"
                    options={[
                        { value: 129, label: 'Winter 2021' },
                        { value: 130, label: 'Fall 2020' }
                    ]}
                    theme={(theme) => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            text: 'black',
                            primary25: '#bcbcbc',
                            primary50: '#bcbcbc',
                            primary: '#bcbcbc',
                        },
                    })}
                />
            </div>

            {charts.hoursPerWeekSubjBeakdown ?

                <ReactEcharts style={{ margin: 'auto 0px' }}
                    option={{
                        title: {
                            text: "Hours Per Week Per Subject",
                            x: 'center',
                            top: 20,
                            textStyle: {
                                fontFamily: 'Helvetica',
                                fontWeight: 100
                            }
                        },
                        tooltip: {
                            trigger: 'axis',
                            //formatter: '{b0}:{d3} {c0}<br />{b1}: {c1}, , {e1}'
                            formatter: function (params) {
                                var colorSpan = color => '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + color + '"></span>';
                                let rez = '<p>' + params[0].axisValue + '</p>';
                                //console.log(params); //quite useful for debug
                                params.forEach(item => {
                                    //console.log(item); //quite useful for debug
                                    var xx = '<p>' + colorSpan(item.color) + ' ' + item.seriesName + ': ' + hoursToTimeDisplay(item.data) + '' + '</p>'
                                    rez += xx;
                                });

                                return rez;
                            }
                        },
                        grid: {
                            right: '10%',
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            data: charts.hoursPerWeekSubjBeakdownXAxis
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: charts.hoursPerWeekSubjBeakdown
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

export default connect(mapStateToProps)(SubjWeeklyBreakdown)