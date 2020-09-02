import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react'
import { Row, Col, Accordion } from 'react-bootstrap'
import {
  loadChartsThunk, loadSubjectBreakdown,
  loadHoursWeek, loadYearBeakdown,
  loadFacultyStats,
  loadMarksScatter,
  loadTaskHoursPerWeek,
  loadPersonalStats,
  loadAverageOfWeekDay
} from '../thunks/chartThunk'
import Select from 'react-select';
import { loadTasks } from '../thunks/taskThunk'
import { connect } from 'react-redux'
import QuickTimer from './QuickTimer'
import moment from 'moment'
import { FaAngleDown, FaLock, FaAngleUp, FaAngleRight, FaAngleLeft } from 'react-icons/fa'
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import { modifyProfile } from '../actions/profileActions'
import { realoadClassesThunk } from '../thunks/subjectThunk'
import { refreshUser, turnOffDashboardTour } from '../thunks/profileThunk'
import Overlay from '../components/Overlay'
import { setCurrentTask } from '../actions/currentTaskActions'

const TOUR_STEPS = [
  {
    target: "#quickT",
    content: 'This is the quick timer.',
    disableBeacon: true,
    disableOverlay: true
  },
  {
    target: "#timerSelect",
    content:
      "You can select a task from your list to be completed, and:",
    locale: {
      last: 'Next'
    },
    disableOverlay: true
  },
  {
    target: "#timerSelect2",
    content:
      "Select either timer, or stopwatch.",
    locale: {
      last: 'Next'
    },
    disableOverlay: true
  },
  {
    target: ".topRight",
    content:
      "Your hours per day are shown here.",
    locale: {
      last: 'Next'
    },
    disableBeacon: true,
    disableOverlay: true
  },
  {
    target: "#row1",
    content:
      "And all your personal analytics are below for you to explore.",
    locale: {
      last: 'Next'
    },
    disableBeacon: true,
    disableOverlay: true
  },


];

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

const Dashboard = ({ dispatch, charts, profile,
  history, subjects, stripeStatus, tasks, width }) => {
  var [dropdown1, setDropdown1] = useState(true)
  var [dropdown2, setDropdown2] = useState(true)
  var [steps, setSteps] = useState(TOUR_STEPS)
  var [stepIndex, setStepIndex] = useState(0)
  var [run, setRun] = useState(true);
  var [whichWeek, setWhichWeek] = useState(moment())

  const isPremium = true
  // (stripeStatus === 'active')

  useEffect(() => {
    if (isPremium) {
      dispatch(loadPersonalStats())
      dispatch(loadAverageOfWeekDay())
      dispatch(refreshUser())
      dispatch(realoadClassesThunk())
      dispatch(loadTasks())
      dispatch(loadChartsThunk())
      dispatch(loadSubjectBreakdown())
      dispatch(loadTaskHoursPerWeek())
    }

    dispatch(loadHoursWeek())



    if (tasks.length > 0) {
      setCurrentTask(tasks[0])
    }

  }, [])

  const goToNextWeek = () => {
    setWhichWeek(whichWeek.add(1, 'w'))
    dispatch(loadHoursWeek(whichWeek))
  }

  const goToPreviousWeek = () => {
    setWhichWeek(whichWeek.subtract(1, 'w'));
    dispatch(loadHoursWeek(whichWeek))
  }

  const handleJoyrideCallback = data => {
    const { action, index, status, type } = data;

    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      // Update state to advance the tour
      setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1))
    }
    else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      setRun(false)
      //turn off locally
      dispatch(modifyProfile({ dashboardTour: 1 }))
      //turn off server
      dispatch(turnOffDashboardTour())
    }

    console.groupCollapsed(type);
    console.log(data); //eslint-disable-line no-console
    console.groupEnd();
  };

  return (
    <div className="dashboard" style={(width < 1000) ? {
      paddingRight: '0px'
    } : {
        border:
          '0px solid blue',
        paddingRight: '300px'
      }} >
      <Joyride steps={TOUR_STEPS}
        continuous={true} showSkipButton={true}
        callback={handleJoyrideCallback}
        run={profile.dashboardTour === 0}
        styles={{
          options: {
            primaryColor: '#fb4033'
          },
          buttonClose: {
            display: 'none',
          },

        }}
      />
      <Row>
        <Col id="quickT" md={6}>
          <div className="graph">
            <div className="timerControl">
              <QuickTimer />
            </div>
          </div>
        </Col>
        <Col md={6} >
          <div className="toggleContainer">
            <div className="toggle">
              <FaAngleLeft
                onClick={goToPreviousWeek}
              />
              <FaAngleRight
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

        </Col>
      </Row>
      {false && <Overlay special={true} />}
      <div>
        <Row id="row1" className="dashRow">
          <Col md={6} style={{
            minHeight: "360px"
          }}>

            <div className="flexNumDisplay" >
              <div className="rowTitle">Current Stats</div>
              <div className="row">
                <div className="square">
                  <div className="squareTitle">Today</div>
                  <div className="squareData">{charts.todayTotal && true ? charts.todayTotal.hours : 0}hrs., {charts.todayTotal && true ? charts.todayTotal.mins : 0}min.</div>
                </div>
                <div className="square">
                  <div className="squareTitle">Past Week</div>
                  <div className="squareData">{charts.thisWeekTotal && true ? charts.thisWeekTotal.hours : 0}hrs., {charts.thisWeekTotal && true ? charts.thisWeekTotal.mins : 0}min.</div>
                </div>
                <div className="square">
                  <div className="squareTitle">Past Month</div>
                  <div className="squareData">{charts.thisMonthTotal && true ? charts.thisMonthTotal.hours : 0}hrs., {charts.thisMonthTotal && true ? charts.thisMonthTotal.mins : 0}min.</div>
                </div>
              </div>
              <div className="rowTitle">Average Result</div>
              <div className="row">
                <div className="square">
                  <div className="squareTitle">Day</div>
                  <div className="squareData">{charts.dailyAverage && true ? charts.dailyAverage.hours : 0}hrs., {charts.dailyAverage && true ? charts.dailyAverage.mins : 0}min.</div>
                </div>
                <div className="square">
                  <div className="squareTitle">Week</div>
                  <div className="squareData">{charts.weeklyAverage && true ? charts.weeklyAverage.hours : 0}hrs., {charts.weeklyAverage && true ? charts.weeklyAverage.mins : 0}min.</div>
                </div>
                <div className="square">
                  <div className="squareTitle">Month</div>
                  <div className="squareData">{charts.monthlyAverage && true ? charts.monthlyAverage.hours : 0}hrs., {charts.monthlyAverage && true ? charts.monthlyAverage.mins : 0}min.</div>
                </div>
              </div>
              <div className="rowTitle">Best Result</div>
              <div className="row">
                <div className="square">
                  <div className="squareTitle">Day</div>
                  <div className="squareData">{charts.bestDay && true ? charts.bestDay.hours : 0}hrs., {charts.bestDay && true ? charts.bestDay.mins : 0}min.</div>
                </div>
                <div className="square">
                  <div className="squareTitle">Week</div>
                  <div className="squareData">{charts.bestWeek && true ? charts.bestWeek.hours : 0}hrs., {charts.bestWeek && true ? charts.bestWeek.mins : 0}min.</div>
                </div>
                <div className="square">
                  <div className="squareTitle">Month</div>
                  <div className="squareData">{charts.bestMonth && true ? charts.bestMonth.hours : 0}hrs., {charts.bestMonth && true ? charts.bestMonth.mins : 0}min.</div>
                </div>
              </div>
            </div>

          </Col>
          <Col md={6}>
            <div className="lineGraph">

              <ReactEcharts
                option={{
                  textStyle: {
                    //fontFamily: 'Helvetica Neue',
                    //color: 'blue'
                  },
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
            </div>
          </Col>
        </Row>
        <Row className="dashRow">
          <Col md={6}>
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
          </Col>
          <Col md={6}>

            {subjects.length === 0 ?
              <div className="noData">
                <div>
                  No Data
                  <div className="subNoData">Create subjects to view subject breakdown</div>
                </div>
              </div> : <ReactEcharts
                option={{

                  tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {d}%'
                  },
                  series: [
                    {
                      type: 'pie',
                      radius: '65%',
                      center: ['50%', '50%'],
                      selectedMode: 'single',
                      data:
                        isPremium ?
                          (charts.pieChart ? charts.pieChart.pieData : []) :
                          [
                            { name: 'math', value: 2 },
                            { name: 'chem', value: 1 },
                            { name: 'hist', value: .5 },
                            { name: 'engl', value: 2 },

                          ]
                      ,
                      color: isPremium ? charts.pieColors : null,
                      emphasis: {
                        itemStyle: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                      }
                    }
                  ]
                }}
              />}
          </Col>
        </Row>
      </div>

      <div className="toggleButton" onClick={() => {
        setDropdown2(!dropdown2)
      }}>
        {dropdown2 ? <FaAngleDown /> : <FaAngleUp />}

        <span>Comparative Analytics</span>
        <span className="lock">{false && <FaLock />}</span>
      </div>
    </div >
  );
}

const mapStateToProps = (state) => {
  return {
    charts: state.charts,
    profile: state.profile,
    subjects: state.subjects,
    stripeStatus: state.profile.userBilling.stripeStatus,
    tasks: state.tasks,
    width: state.width
  }
}

export default connect(mapStateToProps)(Dashboard)


