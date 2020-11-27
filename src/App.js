import React, { useEffect } from 'react';
import ConfigureApp from './configureApp';
import { connect } from 'react-redux'
import { logout } from './actions/profileActions'
import moment from 'moment'
import './styles/styles.scss'
import { Beforeunload } from 'react-beforeunload';


const App = () => {

  var firebaseConfig = {
    apiKey: "AIzaSyA9eRdT7eqCr9pZaihijy3NnbfxhvDBfdY",
    authDomain: "studybuddy-5679b.firebaseapp.com",
    databaseURL: "https://studybuddy-5679b.firebaseio.com",
    projectId: "studybuddy-5679b",
    storageBucket: "studybuddy-5679b.appspot.com",
    messagingSenderId: "328845531685",
    appId: "1:328845531685:web:9806c35fbb14f07275bdcc",
    measurementId: "G-X0NVGCRRNJ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  return (
    <div>
      <ConfigureApp />
    </div>
  )
}

export default connect()(App)