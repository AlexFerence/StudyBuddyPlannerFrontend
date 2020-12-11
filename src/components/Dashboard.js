import React, { useEffect, useState } from 'react';
import { Row, Col, Accordion } from 'react-bootstrap'
import { connect } from 'react-redux'
import QuickTimer from './QuickTimer'
import moment from 'moment'
import { FaAngleDown, FaLock, FaAngleUp, FaAngleRight, FaAngleLeft } from 'react-icons/fa'
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import { modifyProfile } from '../actions/profileActions'
import { realoadClassesThunk } from '../thunks/subjectThunk'
import { refreshUser, turnOffDashboardTour } from '../thunks/profileThunk'
import { setCurrentTask } from '../actions/currentTaskActions'
import { getActiveFriends, getPendingFriends } from '../thunks/friendThunk'
import WeeklyChart from './dashboard-components/WeeklyChart'
import NumbersOverview from './dashboard-components/NumbersOverview'
import SubjWeeklyBreakdown from './dashboard-components/SubjWeeklyBreakdown'
import WeeklyAverage from './dashboard-components/WeeklyAverage'
import SubjPieBreakdown from './dashboard-components/SubjPieBreakdown'
import { Redirect, useHistory } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { loadDetailedView } from '../thunks/premiumStatsThunk'
import GithubCalendar from './premiumPage/charts/GithubCalendar'

const TOUR_STEPS = [
  // {
  //   target: "#quickT",
  //   content: 'Use the quick timer to log study sessions',
  //   disableBeacon: true,
  //   disableOverlay: true
  // },
  // {
  //   target: "#timerSelect",
  //   content:
  //     "You can select a task from your list to be completed.",
  //   locale: {
  //     last: 'Next'
  //   },
  //   disableOverlay: true
  // },
  // {
  //   target: "#timerSelect2",
  //   content:
  //     "Select either timer, stopwatch or time input",
  //   locale: {
  //     last: 'Next'
  //   },
  //   disableOverlay: true
  // },
  // {
  //   target: ".topRight",
  //   content:
  //     "Your hours per day are shown here",
  //   locale: {
  //     last: 'Next'
  //   },
  //   disableBeacon: true,
  //   disableOverlay: true
  // },
  // {
  //   target: "#row1",
  //   content:
  //     "And all your personal analytics are below for you to explore.",
  //   locale: {
  //     last: 'Next'
  //   },
  //   disableBeacon: true,
  //   disableOverlay: true
  // },


];


const Dashboard = ({ dispatch, profile, tasks, width, isAuth }) => {

  var [steps, setSteps] = useState(TOUR_STEPS)
  var [stepIndex, setStepIndex] = useState(0)
  var [run, setRun] = useState(true);
  var [whichWeek, setWhichWeek] = useState(moment())

  const history = useHistory()

  const goToDetailed = () => {
    dispatch(loadDetailedView())
    history.push('/premium/detailed')
  }

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
    isAuth: state.profile.isAuth
  }
}

export default connect(mapStateToProps)(Dashboard)