import React, { useEffect } from 'react';
import ConfigureApp from './configureApp';
import { connect } from 'react-redux'
import { logout } from './actions/profileActions'
import moment from 'moment'
import './styles/styles.scss'

const App = () => {

  return (
    <div>
      <ConfigureApp />
    </div>
  )
}

export default connect()(App)