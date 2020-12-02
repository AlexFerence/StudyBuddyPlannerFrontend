import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header'
// import SignUp from './components/SignUpPage'
// import LoginPage from './components/LoginPage'
import Tasks from './components/Tasks'
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
import { closePayment, logout } from './actions/profileActions';
//import Premium from './components/premiumPage/Premium'
//import PremiumDetailed from './components/premiumDetailedPage/PremiumDetailed'
import { loadFiveCharts } from './thunks/chartThunk'
import { loadSchools } from './thunks/schoolsThunk'
import { loadFaculties } from './thunks/schoolsThunk'
import Loader from './components/shared/Loader'
import FullPageLoader from './components/shared/FullPageLoader'
import Loadable from 'react-loadable'
import { reAuthenticate, refreshUser } from './thunks/profileThunk'
import Modal from 'react-modal'
import PaymentModal from './components/shared/PaymentModal'
import CalendarDetailed from './components/premiumDetailedPage/CalendarDetailed'
import { getSuggestedFriends } from './thunks/friendThunk';
//import SignupThird from './components/SignupThird/SignupThird';


const Dashboard = Loadable({
  loader: () => import('./components/Dashboard'),
  loading: Loader,
});

const SubjectsPage = Loadable({
  loader: () => import('./components/subjects/Subjects3'),
  loading: Loader,
});

const Settings = Loadable({
  loader: () => import('./components/Settings/Settings'),
  loading: Loader,
});

// const Tasks = Loadable({
//   loader: () => import('./components/Tasks'),
//   loading: Loader,
// });

const SignUpSecondary = Loadable({
  loader: () => import('./components/SignUpSecondary'),
  loading: FullPageLoader,
});
const SignupThird = Loadable({
  loader: () => import('./components/SignupThird/SignupThird'),
  loading: FullPageLoader,
})


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

const Blog = Loadable({
  loader: () => import('./components/Blog'),
  loading: Loader,
});

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '201'
  }
};

const customStylesWithFriends = {
  content: {
    top: '50%',
    left: 'calc(50vw - 150px)',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '201'
  }
};

const ConfigureApp = ({ dispatch, width, isAuth, tokenExpiry, loading, profile }) => {
  useEffect(() => {
    dispatch(refreshUser())
    if (isAuth) {
      dispatch(loadFiveCharts())
      dispatch(loadSchools())
      dispatch(loadFaculties())
      dispatch(getSuggestedFriends())

      // refresh token
      const now = moment()
      const weekBeforeExpiry = moment(tokenExpiry).subtract(1, 'w')
      if (now.isAfter(weekBeforeExpiry)) {
        dispatch(reAuthenticate({ email: profile.email, password: profile.password }))
      }

    }

    function handleResize() {
      dispatch(setWidth(window.innerWidth))
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const closePaymentModal = () => {
    dispatch(closePayment())
  }

  return (
    <BrowserRouter history="">
      <Modal
        isOpen={profile.paymentOpen}
        onRequestClose={closePaymentModal}
        style={width > 999 ? customStylesWithFriends : customStyles}
        contentLabel="Example Modal"
      >
        <PaymentModal />
      </Modal>
      <Header />
      {width > 999 && isAuth && <FriendActivity />}
      { false && <Loader />}
      <Switch>
        <Route path='/' component={() => {
          window.location.href = 'https://www.studybuddyplanner.com/';
          return null;
        }} exact />
        <Route path='/blog' component={Blog} />
        <Route path='/signup' component={SignUp} />
        <Route path='/signUpSecondary' component={SignUpSecondary} />
        <Route path='/signupThird' component={SignupThird} />
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
        <Route path='/feed' exact>
          {moment().isAfter(moment(tokenExpiry)) ? <Redirect to='/' /> : <Premium />}
        </Route>
        <Route path='/premium/detailed'>
          {moment().isAfter(moment(tokenExpiry)) ? <Redirect to='/' /> : <PremiumDetailed />}
        </Route>
        <Route path='/calendar'>
          {moment().isAfter(moment(tokenExpiry)) ? <Redirect to='/' /> : <CalendarDetailed />}
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
    loading: state.loading,
    profile: state.profile,

  }
}

export default connect(mapStateToProps)(ConfigureApp)