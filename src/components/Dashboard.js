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
import {realoadClassesThunk} from '../thunks/subjectThunk'

const TOUR_STEPS = [
  {
      target: "#quickT",
      content: 'this is the quick timer',
      disableBeacon: true,
  },
  {
      target: "#timerSelect",
      content:
        "Select task to be completed",
      locale: {
          last: 'Next'
      }
  },
  {
      target: "#timerSelect2",
      content:
        "Select type of timer",
      locale: {
          last: 'Next'
      }
  },
  {
    target: ".topRight",
    content:
      "Weekly hours are provided here",
      locale: {
        last: 'Next'
      },
      disableBeacon: true,
  },
  {
    target: "#row1",
    content:
      "All your personal analytics will be shown below, we hope you enjoy",
      locale: {
        last: 'Next'
      },
      disableBeacon: true,
  },
    

];

//import PerfectScrollbar from 'react-perfect-scrollbar'

const hoursToTimeDisplay = (h) => {
  var hours = Math.floor(h)
  var decimalMins = (h - hours) * 60
  var returnMins = Math.floor(decimalMins)
  if (decimalMins < 10) {
    returnMins = "0" + returnMins
  }
  return(hours + ":" + returnMins)

}

const reducer = (acc, item) => {
  acc = acc.push(item)
  return acc
}

const Dashboard = ({ dispatch, charts, profile, history }) => {
  var [dropdown1, setDropdown1] = useState(true)
  var [dropdown2, setDropdown2] = useState(true)

  var [steps, setSteps] = useState(TOUR_STEPS)
  var [stepIndex, setStepIndex] = useState(0)
  var [run, setRun] = useState(true);

  var [whichWeek, setWhichWeek] = useState(moment())

  useEffect(() => {
    dispatch(realoadClassesThunk())
    dispatch(loadTasks())
    dispatch(loadChartsThunk())
    dispatch(loadSubjectBreakdown())
    dispatch(loadHoursWeek())
    dispatch(loadYearBeakdown())
    dispatch(loadFacultyStats())
    dispatch(loadMarksScatter())
    dispatch(loadTaskHoursPerWeek())
    dispatch(loadPersonalStats())
    dispatch(loadAverageOfWeekDay())
    
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
      dispatch(modifyProfile({ dashTour: false }))
    }

    console.groupCollapsed(type);
    console.log(data); //eslint-disable-line no-console
    console.groupEnd();
  };


  return (
    <div className="dashboard">
    <Joyride steps={TOUR_STEPS} 
        callback={handleJoyrideCallback}
        continuous={true} showSkipButton={true}
        run={profile.dashTour}
        />
      <Row>
        <Col id="quickT" s={6}>
          <div className="graph">
            <div className="timerControl">
              <QuickTimer />
            </div>
          </div>
        </Col>
        <Col s={6} >
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
                  text: "This Week",
                  x: 'center',
                  top: 0,
                  textStyle: {
                    fontFamily: 'Helvetica',
                    fontWeight: 100
                  },
                  subtext: moment(whichWeek).startOf('week').format("MMM D") + " - " + moment(whichWeek).endOf('week').format("MMM D")
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
                        var xx = '<span>' +  hoursToTimeDisplay(item.data) + '' + '</span>'
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
                  name: 'hours',
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
        

      <div className="toggleButton" onClick={() => {
        setDropdown1(!dropdown1)
      }}>
        {dropdown1 ? <FaAngleDown /> : <FaAngleUp />}

        <span>Personal Analytics</span>
        <span className="lock"><FaLock /></span>
      </div>
      {dropdown1 &&
        <div>
          <Row id="row1">
            <Col>
            <div className="flexNumDisplay">
            <div className="rowTitle">Current Stats</div>
            <div className="row">
            <div className="square">
            <div className="squareTitle">Today</div>
            <div className="squareData">{ charts.todayTotal ? charts.todayTotal.hours : 0}hrs., { charts.todayTotal ? charts.todayTotal.mins : 0}min.</div>
            </div>
            <div className="square">
            <div className="squareTitle">Past Week</div>
            <div className="squareData">{ charts.thisWeekTotal ? charts.thisWeekTotal.hours : 0}hrs., { charts.thisWeekTotal ? charts.thisWeekTotal.mins : 0}min.</div>
            </div>
            <div className="square">
            <div className="squareTitle">Past Month</div>
            <div className="squareData">{ charts.thisMonthTotal ? charts.thisMonthTotal.hours : 0}hrs., { charts.thisMonthTotal ? charts.thisMonthTotal.mins : 0}min.</div>
            </div>
            </div>
            <div className="rowTitle">Average Result</div>
            <div className="row">
            <div className="square">
            <div className="squareTitle">Day</div>
            <div className="squareData">{charts.dailyAverage ? charts.dailyAverage.hours : 0}hrs., { charts.dailyAverage ? charts.dailyAverage.mins : 0}min.</div>
            </div>
            <div className="square">
            <div className="squareTitle">Week</div>
            <div className="squareData">{charts.weeklyAverage ? charts.weeklyAverage.hours : 0}hrs., { charts.weeklyAverage ? charts.weeklyAverage.mins : 0}min.</div>
            </div>
            <div className="square">
            <div className="squareTitle">Month</div>
            <div className="squareData">{charts.monthlyAverage ? charts.monthlyAverage.hours : 0}hrs., { charts.monthlyAverage ? charts.monthlyAverage.mins : 0}min.</div>
            </div>
            </div>
            <div className="rowTitle">Best Result</div>
            <div className="row">
            <div className="square">
            <div className="squareTitle">Day</div>
            <div className="squareData">{charts.bestDay ? charts.bestDay.hours : 0}hrs., { charts.bestDay ? charts.bestDay.mins : 0}min.</div>
            </div>
            <div className="square">
            <div className="squareTitle">Week</div>
            <div className="squareData">{charts.bestWeek ? charts.bestWeek.hours : 0}hrs., { charts.bestWeek ? charts.bestWeek.mins : 0}min.</div>
            </div>
            <div className="square">
            <div className="squareTitle">Month</div>
            <div className="squareData">{charts.bestMonth ? charts.bestMonth.hours : 0}hrs., { charts.bestMonth ? charts.bestMonth.mins : 0}min.</div>
            </div>
            </div>
            </div>
            
            </Col>
            <Col>
              <div className="lineGraph">
                <ReactEcharts
                  option={{
                    textStyle: {
                      //fontFamily: 'Helvetica Neue',
                      //color: 'blue'
                    },
                    title: {
                      text: "Minutes Per Week Per Subject",
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
                            var xx = '<p>'   + colorSpan(item.color) + ' ' + item.seriesName + ': ' +  hoursToTimeDisplay(item.data) + '' + '</p>'
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
                      data: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
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
          <Row>
          <Col>
          
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
                            var xx = '<span>' +  hoursToTimeDisplay(item.data) + '' + '</span>'
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
          <Col>
          { !charts.pieColors ?  <div className="noData">
          <div>
          No Data
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
                    charts.pieChart ? charts.pieChart.pieData : []
                  ,
                  color: charts.pieColors,
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
          /> }
          </Col>
          </Row>
        </div>
      }
      <div className="toggleButton" onClick={() => {
        setDropdown2(!dropdown2)
      }}>
        {dropdown2 ? <FaAngleDown /> : <FaAngleUp />}

        <span>Comparative Analytics</span>
        <span className="lock"><FaLock /></span>
      </div>

      {dropdown2 &&
        <div>
          <Row>
            <Col>

              <div>
                <ReactEcharts
                  option={{
                    title: {
                      text: "Your Total Hours vs Different Faculties",
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
                      }
                    },
                    xAxis: {
                      type: 'category',
                      data: charts.facultyXAxis
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
                      data: charts.facultyData,
                      type: 'bar'
                    }]
                  }}
                />
              </div>
              <div>
                <ReactEcharts
                  option={{
                    title: {
                      text: "Your Total Hours vs Different Years",
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
                      }
                    },
                    xAxis: {
                      type: 'category',
                      data: charts.yearXAxis
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
                      data: charts.yearData,
                      type: 'bar'
                    }]
                  }}
                />
              </div>
            </Col>
            <Col>

              <ReactEcharts
                style={{ height: '100%' }}
                option={{
                  xAxis: {
                    scale: true
                  },
                  yAxis: {
                    scale: true
                  },
                  series: [{
                    type: 'effectScatter',
                    symbolSize: 20,
                    // data: [
                    //     [172.7, 105.2],
                    //     [153.4, 42]
                    // ]
                  }, {
                    type: 'scatter',
                    data: charts.scatterData,
                  }]
                }}

              />
            </Col>

          </Row>
        </div>
      }

      
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    charts: state.charts,
    profile: state.profile
  }
}

export default connect(mapStateToProps)(Dashboard)

const noData = () => {
  return(
    <div className="noData">
    <div>
    No Data
    </div>
    </div>
  )
}