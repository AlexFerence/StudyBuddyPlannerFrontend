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
          <Row>
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
              />
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

// </div>
//             <div className="rowTitle">Best Result</div>
//             <div className="row">
//             <div className="square">
//             <div className="squareTitle">Day</div>
//             <div className="squareData">{charts.formattedPersonalStats[2].hours}hrs., {charts.formattedPersonalStats[2].mins}min.</div>
//             </div>
//             <div className="square">
//             <div className="squareTitle">Week</div>
//             <div className="squareData">{charts.formattedPersonalStats[5].hours}hrs., {charts.formattedPersonalStats[5].mins}min.</div>
//             </div>
//             <div className="square">
//             <div className="squareTitle">Month</div>
//             <div className="squareData">{charts.formattedPersonalStats[8].hours}hrs., {charts.formattedPersonalStats[8].mins}min.</div>
//             </div>

// <div className="flexNumDisplay">
//             <div className="rowTitle">Current Stats</div>
//             <div className="row">
//             <div className="square">
//             <div className="squareTitle">Today</div>
//             <div className="squareData">{charts.today}hrs., {charts.formattedPersonalStats[0].mins}min.</div>
//             </div>
//             <div className="square">
//             <div className="squareTitle">This Week</div>
//             <div className="squareData">{charts.formattedPersonalStats[3].hours}hrs., {charts.formattedPersonalStats[3].mins}min.</div>
//             </div>
//             <div className="square">
//             <div className="squareTitle">This Month</div>
//             <div className="squareData">{charts.formattedPersonalStats[6].hours}hrs., {charts.formattedPersonalStats[6].mins}min.</div>
//             </div>
//             </div>
//             <div className="rowTitle">Average Result</div>
//             <div className="row">
//             <div className="square">
//             <div className="squareTitle">Day</div>
//             <div className="squareData">{charts.formattedPersonalStats[1].hours}hrs., {charts.formattedPersonalStats[1].mins}min.</div>
//             </div>
//             <div className="square">
//             <div className="squareTitle">Week</div>
//             <div className="squareData">{charts.formattedPersonalStats[4].hours}hrs., {charts.formattedPersonalStats[4].mins}min.</div>
//             </div>
//             <div className="square">
//             <div className="squareTitle">Month</div>
//             <div className="squareData">{charts.formattedPersonalStats[7].hours}hrs., {charts.formattedPersonalStats[7].mins}min.</div>
//             </div>
            
//             </div>
//             </div>