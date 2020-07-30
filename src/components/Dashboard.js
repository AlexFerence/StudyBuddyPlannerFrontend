import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react'
import { Row, Col } from 'react-bootstrap'
import { loadChartsThunk, loadSubjectBreakdown, loadHoursWeek } from '../thunks/chartThunk'
import { connect } from 'react-redux'
import QuickTimer from './QuickTimer'
//import PerfectScrollbar from 'react-perfect-scrollbar'


const Dashboard = ({ dispatch, charts }) => {
  var [dropdown1, setDropdown1] = useState(false)
  var [dropdown2, setDropdown2] = useState(false)

  useEffect(() => {
    console.log('dispatching')
    dispatch(loadChartsThunk())
    dispatch(loadSubjectBreakdown())
    dispatch(loadHoursWeek())
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
          <div className="graph">
            <ReactEcharts
              option={{
                title : {
                  text:"Hours per week",
                  x:'center'
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
                  nameGap: 50
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

      <button className="toggleButton" onClick={() => {
        setDropdown1(!dropdown1)
      }}>
        Personal Analytics
      </button>
      {dropdown1 &&
        <div>
        <Row>
        <Col>
        <ReactEcharts
            option={{
              tooltip: {},
              series: [
                {
                  type: 'pie',
                  radius: '65%',
                  center: ['50%', '50%'],
                  selectedMode: 'single',
                  data:
                    charts.pieChart.pieData
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

      <button className="toggleButton" onClick={() => {
        setDropdown2(!dropdown2)
      }}>
        Comparitive Analytics
      </button>
      {dropdown2 &&
        <div>
          T
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

