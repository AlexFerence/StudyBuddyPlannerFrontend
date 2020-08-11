import React, {useEffect} from 'react';
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
import Compare from './components/Compare'

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

const ConfigureApp = ({dispatch}) => {
  useEffect(() => {
    dispatch(realoadClassesThunk())
    dispatch(loadTasks())
    dispatch(loadChartsThunk())
    dispatch(loadSubjectBreakdown())
    dispatch(loadHoursWeek())
    dispatch(loadTaskHoursPerWeek())
    dispatch(loadPersonalStats())
    dispatch(loadAverageOfWeekDay())
    dispatch(refreshUser())
    
  }, [])

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path='/' component={Landing} exact />
        <Route path='/signup' component={FormPage} />
        <Route path='/signUpSecondary' component={SignUpSecondary} />
        <Route path='/login' exact component={LoginPage} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/compare' component={Compare} />
        <Route path='/tasks' component={Tasks} />
        <Route path='/settings' component={Settings} />
        <Route path='/subjects' component={SubjectsPage} />
      </Switch>
    </BrowserRouter>
  )
}
  
export default connect()(ConfigureApp)