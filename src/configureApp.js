import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import FormPage from './components/SignUpPage'
import LoginPage from './components/LoginPage'
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Tasks from './components/Tasks'
import Settings from './components/Settings'
import SubjectsPage from './components/Subjects'
import SignUpSecondary from './components/SignUpSecondary'
import Landing from './components/landing'
import FriendActivity from './components/FriendActivity'
//import Compare from './components/Compare'
import {
  loadChartsThunk, loadSubjectBreakdown,
  loadHoursWeek, loadYearBeakdown,

  loadTaskHoursPerWeek,
  loadPersonalStats,
  loadAverageOfWeekDay
} from './thunks/chartThunk'

import { loadTasks } from './thunks/taskThunk'
import { connect } from 'react-redux'

import { realoadClassesThunk } from './thunks/subjectThunk'
import { refreshUser } from './thunks/profileThunk'
//import '../node_modules/normalize-scss/sass/normalize.scss'
import './styles/styles.scss'


const ConfigureApp = ({ dispatch }) => {

  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  })

  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
      // setDimensions({
      //   height: window.innerHeight,
      //   width: window.innerWidth
      // })
    }
    //console.log(width)
    //console.log('changed')
    //console.log(dimensions.width)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  // useEffect(() => {
  //   if (width < 400) {
  //     console.log('smol')
  //   }

  // }, [width])


  return (
    <BrowserRouter>
      <Header width={width} />
      {width > 999 && <FriendActivity />}
      <Switch>
        <Route path='/' component={Landing} exact />
        <Route path='/signup' component={FormPage} />
        <Route path='/signUpSecondary' component={SignUpSecondary} />
        <Route path='/login' exact component={LoginPage} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/tasks' component={Tasks} />
        <Route path='/settings' component={Settings} />
        <Route path='/subjects' component={SubjectsPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default connect()(ConfigureApp)

//<Route path='/compare' component={Compare} />