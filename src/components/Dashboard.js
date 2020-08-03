import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react'
import { Row, Col, Accordion } from 'react-bootstrap'
import { loadChartsThunk, loadSubjectBreakdown, 
  loadHoursWeek, loadYearBeakdown,
  loadFacultyStats,
  loadMarksScatter
} from '../thunks/chartThunk'
import { connect } from 'react-redux'
import QuickTimer from './QuickTimer'
import { FaAngleDown, FaLock, FaAngleUp } from 'react-icons/fa'

//import PerfectScrollbar from 'react-perfect-scrollbar'

const reducer = (acc, item) => {
  acc = acc.push(item)
  return acc
}

const Dashboard = ({ dispatch, charts }) => {
  var [dropdown1, setDropdown1] = useState(true)
  var [dropdown2, setDropdown2] = useState(true)

  useEffect(() => {
    
    console.log('dispatching')
    dispatch(loadChartsThunk())
    //dispatch(loadSubjectBreakdown())
    dispatch(loadHoursWeek())
    dispatch(loadYearBeakdown())
    dispatch(loadFacultyStats())
    dispatch(loadMarksScatter())
  }, [])

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
          <div className="graph topRight">
            <ReactEcharts
              option={{
                title : {
                  text:"Hours per week",
                  x:'center',
                  top : 20
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
                  axisLabel : {
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
        { dropdown1 ? <FaAngleDown /> : <FaAngleUp /> }
        
        <span>Personal Analytics</span>
        <span className="lock"><FaLock /></span>
      </div>
      {dropdown1 &&
        <div>
        <Row>
        <Col>
        <ReactEcharts
            option={{
              title : {
                text:"Hours Subject Breakdown",
                x:'center',
                top : 20
              },
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
          </Col>
        </Row>
        </div>
      }
      <div className="toggleButton" onClick={() => {
        setDropdown2(!dropdown2)
      }}>
        { dropdown2 ? <FaAngleDown /> : <FaAngleUp /> }
        
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
                title : {
                  text:"Your Total Hours vs Different Faculties",
                  x:'center',
                  top : 20
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
                  axisLabel : {
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
                title : {
                  text:"Your Total Hours vs Different Years",
                  x:'center',
                  top : 20
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
                  axisLabel : {
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
          style={{ height: '100%'}}
          option = {{
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

