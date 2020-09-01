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
import FriendActivity from './components/friend-components/FriendActivity'
import { connect } from 'react-redux'
import { setWidth } from './actions/widthActions'
import './styles/styles.scss'

const ConfigureApp = ({ dispatch, width, isAuth }) => {


  useEffect(() => {
    function handleResize() {
      dispatch(setWidth(window.innerWidth))
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
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/tasks' component={Tasks} />
        <Route path='/settings' component={Settings} />
        <Route path='/subjects' component={SubjectsPage} />
      </Switch>
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => {
  return {
    width: state.width,
    isAuth: state.profile.isAuth
  }
}

export default connect(mapStateToProps)(ConfigureApp)