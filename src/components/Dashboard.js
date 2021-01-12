import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import QuickTimer from './QuickTimer'
import { setCurrentTask } from '../actions/currentTaskActions'
import { getActiveFriends, getPendingFriends } from '../thunks/friendThunk'
import WeeklyChart from './dashboard-components/WeeklyChart'
import NumbersOverview from './dashboard-components/NumbersOverview'
import SubjWeeklyBreakdown from './dashboard-components/SubjWeeklyBreakdown'
import WeeklyAverage from './dashboard-components/WeeklyAverage'
import SubjPieBreakdown from './dashboard-components/SubjPieBreakdown'
import { Redirect, useHistory } from 'react-router-dom'
import Select from 'react-select';
import { loadPieChartWithId, loadTaskHoursPerWeekById } from '../thunks/chartThunk';
import { setSelectedSemester } from '../actions/selectedSemesterActions';

const semestersReduce = (list, semester) => {
  list.push({ value: semester.id, label: semester.title })
  return list
}

const Dashboard = ({ dispatch, tasks, width, isAuth, semesters }) => {

  const activeSemester = semesters.find((semester) => semester.title === 'Winter 2021')

  const [semester, setSemester] = useState({
    value: activeSemester.id,
    label: activeSemester.title
  })

  const setCharts = async () => {
    await dispatch(loadPieChartWithId(semester.value))
    await dispatch(loadTaskHoursPerWeekById(semester.value))
    dispatch(setSelectedSemester({
      id: semester.value,
      title: semester.title
    }))
    console.log('charts have been set')
  }

  useEffect(() => {
    dispatch(setSelectedSemester({
      id: semester.value,
      title: semester.title
    }))
    console.log(semester)
    setCharts()
  }, [semester])

  const history = useHistory()

  useEffect(() => {
    dispatch(getActiveFriends())
    dispatch(getPendingFriends())
    if (tasks.length > 0) {
      setCurrentTask(tasks[0])
    }
  }, [])

  if (!isAuth) {
    return (
      <Redirect to="/" />
    )
  }

  return (
    <div className="dashboard" style={(width < 1000) ? {
      paddingRight: '0px'
    } : {
        border: '0px solid blue',
        paddingRight: '300px'
      }} >
      <div className="rows">
        <Row>
          <Col className="boxCol" id="quickT" md={6}>
            <div className="innerBoxCol">
              <div className="graph">
                <div className="timerControl">
                  <QuickTimer />
                </div>
              </div>
            </div>
          </Col>
          <Col className="boxCol" md={6} >
            <div className="innerBoxCol">
              <WeeklyChart />
            </div>
          </Col>
        </Row>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0px 12px',
          color: 'grey',
          fontSize: '18px'
        }}>
          <div>My Analytics</div>
          <div style={{
            width: '250px',

          }}>
            <Select
              value={semester}
              onChange={val => setSemester(val)}
              placeholder="Select Term"
              options={semesters.reduce(semestersReduce, [])}
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
        </div>
        <Row id="row1">
          <Col className="boxCol" md={6}>
            <div className="innerBoxCol">
              <SubjPieBreakdown />
            </div>
          </Col>
          <Col className="boxCol" md={6}>
            <div className="innerBoxCol">
              <SubjWeeklyBreakdown />
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="boxCol" md={6}>
            <div className="innerBoxCol">
              <WeeklyAverage />
            </div>
          </Col>

          <Col className="boxCol" md={6} style={{
            minHeight: "360px"
          }}>
            <NumbersOverview />
          </Col>
        </Row>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    charts: state.charts,
    profile: state.profile,
    subjects: state.subjects,
    stripeStatus: state.profile.userBilling.stripeStatus,
    tasks: state.tasks,
    width: state.width,
    isAuth: state.profile.isAuth,
    semesters: state.profile.semesters
  }
}

export default connect(mapStateToProps)(Dashboard)