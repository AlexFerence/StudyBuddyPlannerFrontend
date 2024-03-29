import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap'
import ReactEcharts from 'echarts-for-react';
import { connect } from 'react-redux'
import { loadMarksScatter, comparativePersonalToAverage } from '../thunks/chartThunk';
import { userActivityCount } from '../thunks/userActivityThunk';
import Select from 'react-select'
import CountUp from 'react-countup';
import QuickTimer from './QuickTimer'
import FriendActivity from './FriendActivity'
import Overlay from '../components/Overlay'

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
        //dispatch(loadMarksScatter())
        dispatch(userActivityCount())

        if (subjects.length === 0) {
            setEmptySubjError(true);
        }
        else {
            dispatch(comparativePersonalToAverage(subjects[0].id))
            setLocalSubjects(makeSubjects(subjects))
            setLocalSubject({ value: subjects[0], label: subjects[0].name + " " + subjects[0].classCode })
        }
    }, [])


    const makeSubjects = (subjects) => {
        var formattedSubjects = []
        subjects.forEach((subject) => {
            formattedSubjects.push({ value: subject, label: subject.name + " " + subject.classCode })
        })
        return formattedSubjects
    }

    const subjectChanged = (value) => {
        setLocalSubject(value)
        dispatch(comparativePersonalToAverage(value.value.id))
    }

    return (
        <div className="compare">
            <Row>
                <Col md={6} className="left">
                    <div className="nums">
                        <Col>
                            <div className="compare-quick-timer">
                                <QuickTimer specialFunction={userActivityCount} />
                            </div>
                        </Col>
                        {false
                            //make true to get useractivity back
                            && <Col>
                                <div className="flex-triple-horizontal dashRow">
                                    <div className="triple-center"
                                        style={{ paddingTop: '60px', paddingBottom: '60px' }}
                                    >
                                        <div className="full-width">
                                            <div className="curBold">
                                                {charts.SchoolFacultyCurUsers}
                                            </div>
                                            <div className="subCurBold">Active Users in Your Faculty + University  </div>
                                        </div>
                                    </div>
                                    <div className="triple-center">
                                        <div>
                                            <div className="full-width curBold">{charts.SchoolCurUsers}</div>
                                            <div className="subCurBold">Active Users in Your University</div>
                                        </div>
                                    </div>
                                    <div className="triple-center">
                                        <div>
                                            <div className="full-width curBold">{charts.WorldCurUsers}</div>
                                            <div className="subCurBold">Active Users WorldWide</div>
                                        </div>
                                    </div>
                                </div>
                            </Col>}
                    </div>
                    <div className="dashRow">
                        <Col>
                            <div>
                                <div className="subjCompareSelect">
                                    <Select
                                        className="timerSelect"
                                        value={localSubject}
                                        onChange={subjectChanged}
                                        placeholder="Subject..."
                                        options={localSubjects}
                                        theme={(theme) => ({
                                            ...theme,
                                            // colors: {
                                            //     ...theme.colors,
                                            //     text: 'orange',
                                            //     primary25: '#FB4033',
                                            //     primary: '#656565'
                                            // }
                                        })}
                                        className="half-width"
                                    />
                                </div>
                                {false &&
                                    // PREMIUM make true to hide overlay
                                    <Overlay />}

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


                        </Col>

                    </div>

                </Col>
                <Col md={6} style={{ padding: '0px' }}>
                    <div className="stickyActivity">
                        <div className="friendActivityHeader">
                            Friend activity
                        </div>
                        <FriendActivity />
                    </div>
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