import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react'
import { Row, Col, Accordion } from 'react-bootstrap'
import {
  loadChartsThunk, loadSubjectBreakdown,
  loadHoursWeek, loadYearBeakdown,
  loadFacultyStats,
  loadMarksScatter,
  loadTaskHoursPerWeek
} from '../thunks/chartThunk'
import Select from 'react-select';
import { loadTasks } from '../thunks/taskThunk'
import { connect } from 'react-redux'
import QuickTimer from './QuickTimer'
import moment from 'moment'
import { FaAngleDown, FaLock, FaAngleUp, FaAngleRight, FaAngleLeft } from 'react-icons/fa'

//import PerfectScrollbar from 'react-perfect-scrollbar'

const reducer = (acc, item) => {
  acc = acc.push(item)
  return acc
}

const Dashboard = ({ dispatch, charts }) => {
  var [dropdown1, setDropdown1] = useState(true)
  var [dropdown2, setDropdown2] = useState(true)

  var [whichWeek, setWhichWeek] = useState(moment())

  useEffect(() => {
    dispatch(loadTasks())
    console.log('dispatching')
    dispatch(loadChartsThunk())
    dispatch(loadSubjectBreakdown())
    dispatch(loadHoursWeek())
    dispatch(loadYearBeakdown())
    dispatch(loadFacultyStats())
    dispatch(loadMarksScatter())
    dispatch(loadTaskHoursPerWeek())

  }, [])

  const goToNextWeek = () => {
    setWhichWeek(whichWeek.add(1, 'w'))
    dispatch(loadHoursWeek(whichWeek))
  }

  const goToPreviousWeek = () => {
    setWhichWeek(whichWeek.subtract(1, 'w'));
    dispatch(loadHoursWeek(whichWeek))
  }

  return (
    <div className="dashboard">
      <Row>
        <Col s={6}>
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
                  top: 0
                },
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'shadow'
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
          <Row>
            <Col>
              
              <ReactEcharts
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
              />
            </Col>
            <Col>
              <div className="lineGraph">
                <ReactEcharts
                  option={{

                    title: {
                      text: "Hours Per Week Per Subject",
                      x: 'center',
                      top: 20
                    },
                    tooltip: {
                      trigger: 'axis'
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
                      top: 20
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
                      top: 20
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
    charts: state.charts
  }
}


export default connect(mapStateToProps)(Dashboard)


// <div className="dropdownBar">
//                 <div className="dropdown">
//                   <Select
//                     className="timerSelect"
//                     value={pieFilter}
//                     onChange={val => setPieFilter(val)}
//                     placeholder="Filter by ..."
//                     options={[
//                       { value: 'Timer', label: 'Timer' },
//                       { value: 'Stopwatch', label: 'Stopwatch' }

//                     ]}
//                   />
//                 </div>
//               </div>