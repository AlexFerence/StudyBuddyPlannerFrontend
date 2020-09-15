import React, { useEffect } from 'react';
import ConfigureApp from './configureApp';
import { connect } from 'react-redux'
import { logout } from './actions/profileActions'
import moment from 'moment'
import './styles/styles.scss'
import { Beforeunload } from 'react-beforeunload';
import { useBeforeunload } from 'react-beforeunload';

const App = () => {

  useBeforeunload(() => "You'll lose your data!");
  return (
    <div>
      <ConfigureApp />
    </div>
  )
}

export default connect()(App)