import React from 'react';
import ConfigureApp from './configureApp';
import { connect } from 'react-redux'
import { runningOffThunk } from './thunks/userActivityThunk'
import './styles/styles.scss'
import ReactGA from 'react-ga';

const trackingId = "UA-177528109-1";
ReactGA.initialize(trackingId);

const App = ({ dispatch }) => {
  return (
    <div>
      <ConfigureApp />
    </div>
  )
}

export default connect()(App)


