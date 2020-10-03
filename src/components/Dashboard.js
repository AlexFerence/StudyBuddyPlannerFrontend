import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react'
import { Row, Col, Accordion } from 'react-bootstrap'
import {
  loadChartsThunk, loadSubjectBreakdown,
  loadHoursWeek,
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
import { logout } from '../actions/profileActions'
import { getActiveFriends, getPendingFriends } from '../thunks/friendThunk'
import { loadSchools } from '../thunks/schoolsThunk';
import WeeklyChart from './dashboard-components/WeeklyChart'
import NumbersOverview from './dashboard-components/NumbersOverview'
import SubjWeeklyBreakdown from './dashboard-components/SubjWeeklyBreakdown'
import WeeklyAverage from './dashboard-components/WeeklyAverage'
import SubjPieBreakdown from './dashboard-components/SubjPieBreakdown'


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

    dispatch(getActiveFriends())
    dispatch(getPendingFriends())
    if (tasks.length > 0) {
      setCurrentTask(tasks[0])
    }

  }, [])


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
    //eslint-disable-line no-console
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
        <Row id="row1">
          <Col className="boxCol" md={6} style={{
            minHeight: "360px"
          }}>
            <NumbersOverview />
          </Col>
          <Col className="boxCol" md={6}>
            <div className="innerBoxCol extra-top-padding">
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
          <Col className="boxCol" md={6}>
            <div className="innerBoxCol">
              <SubjPieBreakdown />
            </div>
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
    width: state.width
  }
}

export default connect(mapStateToProps)(Dashboard)



// <div className="toggleButton" onClick={() => {
//   setDropdown2(!dropdown2)
// }}>
//   {dropdown2 ? <FaAngleDown /> : <FaAngleUp />}

//   <span>Comparative Analytics</span>
//   <span className="lock">{false && <FaLock />}</span>
// </div>