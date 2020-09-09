import React from 'react';
import ConfigureApp from './configureApp';
import { Beforeunload } from 'react-beforeunload';
import { connect } from 'react-redux'
import { runningOffThunk } from './thunks/userActivityThunk'
import './styles/styles.scss'
import ReactGA from 'react-ga';

const trackingId = "UA-177528109-1";
ReactGA.initialize(trackingId);

const App = ({ dispatch }) => {
  return (
    <div >
      <Beforeunload onBeforeunload={() => {
        dispatch(runningOffThunk())
      }}>
        <ConfigureApp />
      </Beforeunload>
    </div>
  )
}

export default connect()(App)


