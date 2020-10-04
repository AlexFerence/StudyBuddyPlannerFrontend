import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header'
// import SignUp from './components/SignUpPage'
// import LoginPage from './components/LoginPage'
//import Tasks from './components/Tasks'
//import Settings from './components/Settings'
//import SubjectsPage from './components/Subjects'
//import Subjects2 from './components/subjects/Subjects2'
//import Subjects3 from './components/subjects/Subjects3'
//import SignUpSecondary from './components/SignUpSecondary'
//import Landing from './components/landing'
//import PrivatePolicy from './components/PrivatePolicy'
import FriendActivity from './components/friend-components/FriendActivity'
//import ResetPassword from './components/ResetPassword'
import { connect } from 'react-redux'
import { setWidth } from './actions/widthActions'
import './styles/styles.scss'
import moment from 'moment'
//import Dashboard from './components/Dashboard';
import { logout } from './actions/profileActions';
//import Premium from './components/premiumPage/Premium'
//import PremiumDetailed from './components/premiumDetailedPage/PremiumDetailed'
import { loadFiveCharts } from './thunks/chartThunk'

import Loader from './components/shared/Loader'
import FullPageLoader from './components/shared/FullPageLoader'
import Loadable from 'react-loadable';

const Dashboard = Loadable({
  loader: () => import('./components/Dashboard'),
  loading: Loader,
});

const SubjectsPage = Loadable({
  loader: () => import('./components/subjects/Subjects3'),
  loading: Loader,
});

const Settings = Loadable({
  loader: () => import('./components/Settings'),
  loading: Loader,
});

const Tasks = Loadable({
  loader: () => import('./components/Tasks'),
  loading: Loader,
});

const SignUpSecondary = Loadable({
  loader: () => import('./components/SignUpSecondary'),
  loading: FullPageLoader,
});

const PrivatePolicy = Loadable({
  loader: () => import('./components/PrivatePolicy'),
  loading: FullPageLoader,
});

const SignUp = Loadable({
  loader: () => import('./components/SignUpPage'),
  loading: FullPageLoader,
});

const LoginPage = Loadable({
  loader: () => import('./components/LoginPage'),
  loading: FullPageLoader,
});

const Landing = Loadable({
  loader: () => import('./components/landing'),
  loading: FullPageLoader,
});

const ResetPassword = Loadable({
  loader: () => import('./components/ResetPassword'),
  loading: FullPageLoader,
});
const PremiumDetailed = Loadable({
  loader: () => import('./components/premiumDetailedPage/PremiumDetailed'),
  loading: FullPageLoader,
});
const Premium = Loadable({
  loader: () => import('./components/premiumPage/Premium'),
  loading: FullPageLoader,
});


const ConfigureApp = ({ dispatch, width, isAuth, tokenExpiry, loading }) => {
  useEffect(() => {

    if (moment().isAfter(moment(tokenExpiry))) {
      dispatch(logout())
    }

    if (isAuth) {
      dispatch(loadFiveCharts())
    }

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
      { loading && <Loader />}
      <Switch>
        <Route path='/' component={Landing} exact />
        <Route path='/signup' component={SignUp} />
        <Route path='/signUpSecondary' component={SignUpSecondary} />
        <Route path='/login' exact component={LoginPage} />
        <Route path='/privatepolicy' exact component={PrivatePolicy} />
        <Route path='/resetpassword' exact component={ResetPassword} />
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

        <Route path='/premium' exact>
          {moment().isAfter(moment(tokenExpiry)) ? <Redirect to='/' /> : <Premium />}
        </Route>
        <Route path='/premium/detailed'>
          {moment().isAfter(moment(tokenExpiry)) ? <Redirect to='/' /> : <PremiumDetailed />}
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
    loading: state.loading
  }
}

export default connect(mapStateToProps)(ConfigureApp)
