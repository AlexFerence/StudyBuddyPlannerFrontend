import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import laptop2 from '../assets/laptop2.png'
import futureplans from '../assets/futureplans.png'
//import pencils from '../assets/video.mp4'
import JoyRide from 'react-joyride';
import LandingNav from './LandingNavBar'
import LandingBarChart from './landing-charts/LandingBarChart'
import LandingLineChart from './landing-charts/LandingLineChart'
import OverviewBar from './admin-components/OverviewBar'

import SampleFriendItem from './landing-charts/SampleFriendItem'


const TOUR_STEPS = [
  {
    target: "#about",
    content: "This is where you can search the dashboard.",
    disableBeacon: true
  },
  {
    target: "#features",
    content:
      "Bar chart for total order. You can see beautiful graphs here, thanks to creative tim for such UI."
  },
  {
    target: "",
    content:
      "Bar chart for total order. You can see beautiful graphs here, thanks to creative tim for such UI."
  },
];

const Landing = ({ history, profile, width }) => {

  var [run, setRun] = useState(false)

  useEffect(() => {
    if (profile.email && profile.isAuth) {
      history.push('/dashboard')
    }
  }, [])

  const goToSignUp = () => {
    history.push("/signup")
  }

  return (
    <div className="landing"
      id="#my-first-step">

      <JoyRide steps={TOUR_STEPS} continuous={true} showSkipButton={true} />

      <div className="landingNav" style={{ padding: '0px' }}>
        <LandingNav />
      </div>
      <div className="landingDisplay">
        <video id="background-video" loop autoPlay muted>
          <source src="/videos/video2.mp4" type="video/mp4" />
          <source src="/videos/video2.mp4" type="video/ogg" />
            Your browser does not support the video tag.
            </video>
      </div>
      <div id="special-overlay" className="overlay landingDisplay">
        <div style={{ height: '80px' }}></div>
        <div>
          <div className="promotion">Studying,</div>
          <div className="promotion">it's better with friends.</div>
          <div><button id="mainButton"
            className="navButtonSignUp"
            onClick={goToSignUp}>Sign Up</button></div>
        </div>
        <div className="overview-bar-container">
          <OverviewBar />
          <div style={{ height: '35px' }}></div>
        </div>
      </div>


      <div className='player-wrapper'>
        <a id="features"></a>

        <div className="rowSection">
          <div style={{ height: '40px' }}></div>
          <Row style={{ height: '100%' }}>
            <Col md={6} className="textCol">
              <div className="textInner">
                <div className="textHeader">Get Started</div>
                <div className="get-started-list-item"><div className="get-started-list-num">1</div> Add Your Subjects</div>
                <div className="get-started-list-item"><div className="get-started-list-num">2</div>Add Your Tasks</div>
                <div className="get-started-list-item"><div className="get-started-list-num">3</div>Start the timer and get studying!</div>
              </div>
            </Col>
            <Col md={6} className="imageCol">
              <img src={laptop2} className="imageInner" />
            </Col>

          </Row>
        </div>

        <a id="premium"></a>
        <div className="rowSection" id="align-center">
          <Row style={{ height: '100%' }}>
            <Col md={6} className="textCol">
              <div className="textInner">
                <div className="textHeader">Stay Connected</div>
                <div className="textPara">At StudyBuddy we believe studying
                is always better with friends, which is why we allow users to view what their friends
                are studying and let them feel connected even when studying remotely</div>
              </div>
            </Col>

            <Col md={6} className="imageCol">
              <div className="imageInner">
                { /* put component here */}
                <SampleFriendItem
                  name="Ari Kaufman"
                  initials="AK"
                  subj="MATH 133"
                  taskType="Assignment" />
                <SampleFriendItem
                  name="Alex Ference"
                  initials="AF"
                  subj="ATOC 185"
                  active="5"
                  taskType="Assignment"
                  bottom={true}
                />


              </div>
            </Col>

          </Row>
        </div>

        <div className="rowSection">
          <div className="rowSection">
            <Row style={{ height: '100%' }}>
              <Col md={6} className="imageCol">
                <div className="imageInner">
                  <LandingLineChart />
                </div>
              </Col>
              <Col md={6} className="textCol">
                <div className="textInner">
                  <div className="textHeader">Track Your Studying</div>
                  <div className="textPara">Timers, stopwatches and input fields are all avaliable
                  for users to tack their studying. SudyBuddy's software then generates visually
                  stimulating graphs to show the user their progress in a multitude of ways.
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <a id="futureplan"></a>
          <div id="align-center" className="rowSection">
            <Row style={{ height: '100%' }}>
              <Col md={6} className="textCol">
                <div className="textInner">
                  <div className="textHeader">" It apeases the part of the brain
                  that craves checking things off "</div>
                  <div className="textPara">- StudyBuddy User</div>
                </div>
              </Col>
              <Col md={6} className="textCol">
                <div className="textInner">
                  <div className="textHeader">" I feel connected to my friends while still staying
                  productive, I didn't think that was even possible "</div>
                  <div className="textPara">- StudyBuddy User</div>
                </div>
              </Col>

              <Col md={6} className="imageCol">
                <div style={{ height: '100px' }}></div>
                <button id="mainButton"
                  className="navButtonSignUp"
                  onClick={goToSignUp}>Sign Up</button>
                { /* <img src={futureplans} style={{ width: '50%' }} /> */}
              </Col>
            </Row>
          </div>

          <footer className="footerSection">
            <div>
              <div className="footer-copy">© StudyBuddy</div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    width: state.width
  }
}

export default connect(mapStateToProps)(Landing)

//test

      // <div className="landingNav">
      //   <button id="brand" className="navButton">StudyBuddy</button>
      //   <div>
      //     <a className="navButton" href="#features">Features</a>
      //     <a className="navButton" href="#premium">Premium</a>
      //     <a className="navButton" href="#futureplan">Future Plan</a>
      //     <button className="navButtonSignUp"
      //       onClick={goToSignUp}
      //     >Sign Up</button>
      //   </div>
      // </div>


      // <div className="landingNav">
      //   <button id="brand" className="navButton">StudyBuddy</button>
      //   <div>
      //     <a className="navButton" href="#features">Features</a>
      //     <a className="navButton" href="#premium">Premium</a>
      //     <a className="navButton" href="#futureplan">Future Plan</a>
      //     <button className="navButtonSignUp"
      //       onClick={goToSignUp}
      //     >Sign Up</button>
      //   </div>
      // </div>

      // Study Buddy offers in depth analysis on all of your studies. We will help you
      //           track how you divide your time through the week, across all your subjects, and much more. Not only will we be able to track
      //           how you study best, we can also track how you stack up against other students in your subjects, faculty, and school.</div>
