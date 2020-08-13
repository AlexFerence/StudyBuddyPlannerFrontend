import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap'
import ReactEcharts from 'echarts-for-react';
import { connect } from 'react-redux'
import { loadMarksScatter, comparativePersonalToAverage } from '../thunks/chartThunk'
import Select from 'react-select'

const hoursToTimeDisplay = (h) => {
    var hours = Math.floor(h)
    var decimalMins = (h - hours) * 60
    var returnMins = Math.floor(decimalMins)
    if (decimalMins < 10) {
        returnMins = "0" + returnMins
    }
    return (hours + ":" + returnMins)

}

const reducer = (acc, item) => {
    acc = acc.push(item)
    return acc
}


const Compare = ({ charts, dispatch, subjects }) => {

    const [emptySubjError, setEmptySubjError] = useState(false)
    const [localSubjects, setLocalSubjects] = useState([])
    const [localSubject, setLocalSubject] = useState({})

    useEffect(() => {
        dispatch(loadMarksScatter())

        if (subjects.length === 0) {
            setEmptySubjError(true);
            
        }
        else {
            dispatch(comparativePersonalToAverage(subjects[0].id))
            setLocalSubjects(makeSubjects(subjects))
        }
    }, [])


    const makeSubjects = (subjects) => {
        var formattedSubjects = []
        subjects.forEach((subject) => {
            formattedSubjects.push({ value: subject, label: subject.name + " " + subject.classCode})
        })
        return formattedSubjects
    }

    const subjectChanged = (value) => {
        setLocalSubject(value)
        dispatch(comparativePersonalToAverage(value.value.id))
    }

    return (
        <div>
            <Row>
                <Col>
                    
                </Col>
                <Col>

                    {emptySubjError ? <div className="noData">
                        <div>
                            No Data
          <div className="subNoData">Create subjects to view subject breakdown</div>
                        </div>
                    </div> :
                    <div>
                        <Select
                            className="timerSelect"
                            value={localSubject}
                            onChange={subjectChanged}
                            placeholder="Subject..."
                            options={localSubjects}
                        />
                        <ReactEcharts
                            option={{
                                textStyle: {
                                    //fontFamily: 'Helvetica Neue',
                                    //color: 'blue'
                                },
                                title: {
                                    text: "Compare Class Hours to Average",
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
                                    data: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5']
                                },
                                yAxis: {
                                    type: 'value'
                                },
                                series: charts.comparativePersonalToAverageData
                            }}
                        />
                        </div>
                    }

                </Col>
            </Row>
            <Row>
                <Col>
                    <ReactEcharts
                        option={{
                            title: {
                                text: "GPA - Hours Spent",
                                x: 'center',
                                top: 0,
                                textStyle: {
                                    fontFamily: 'Helvetica',
                                    fontWeight: 100
                                },
                            },
                            tooltip: {
                            },
                            xAxis: {
                                name : "Hours",
                                nameLocation: 'middle',
                                nameGap: 35

                            },
                            yAxis: {

                            },
                            series: [{
                                symbolSize : 10,
                                data: charts.scatterData,
                                type: 'scatter'
                            }]
                        }}
                    />
                </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        charts: state.charts,
        subjects: state.subjects

    }
}

export default connect(mapStateToProps)(Compare) 