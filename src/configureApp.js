import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import FormPage from './components/SignUpPage'
import LoginPage from './components/LoginPage'
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header'

import Tasks from './components/Tasks'
import Settings from './components/Settings'
import SubjectsPage from './components/Subjects'
import SignUpSecondary from './components/SignUpSecondary'
import Landing from './components/landing'
import FriendActivity from './components/friend-components/FriendActivity'
import { connect } from 'react-redux'
import { setWidth } from './actions/widthActions'
import './styles/styles.scss'
import moment from 'moment'
import Dashboard from './components/Dashboard';
import { logout } from './actions/profileActions';

const ConfigureApp = ({ dispatch, width, isAuth, tokenExpiry }) => {


  useEffect(() => {
    function handleResize() {
      dispatch(setWidth(window.innerWidth))
    }

    if (moment().isAfter(moment(tokenExpiry))) {
      dispatch(logout())
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  return (
    <BrowserRouter history="">
      <Header />
      {width > 999 && isAuth && <FriendActivity />}
      <Switch>
        <Route path='/' component={Landing} exact />
        <Route path='/signup' component={FormPage} />
        <Route path='/signUpSecondary' component={SignUpSecondary} />
        <Route path='/login' exact component={LoginPage} />
        <Route path='/dashboard'>
          {moment().isAfter(moment(tokenExpiry)) ? <Redirect to='/' /> : <Dashboard />}
        </Route>
        <Route path='/tasks'>
          {moment().isAfter(moment(tokenExpiry)) ? <Redirect to='/' /> : <Tasks />}
        </Route>
        <Route path='/settings'>
          {moment().isAfter(moment(tokenExpiry)) ? <Redirect to='/' /> : <Settings />}
        </Route>
        <Route path='/subjects'>
          {moment().isAfter(moment(tokenExpiry)) ? <Redirect to='/' /> : <SubjectsPage />}
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => {
  return {
    width: state.width,
    isAuth: state.profile.isAuth,
    tokenExpiry: state.profile.tokenExpiry,
  }
}

export default connect(mapStateToProps)(ConfigureApp)