import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import laptop from '../assets/laptop.png'
import laptop2 from '../assets/laptop2.png'
import futureplans from '../assets/futureplans.png'
import timer from '../assets/timer.png'
//import pencils from '../assets/video.mp4'
import ReactEcharts from 'echarts-for-react'
import ReactPlayer from 'react-player'
import JoyRide from 'react-joyride';
import LandingNav from './LandingNavBar'
import LandingBarChart from './landing-charts/LandingBarChart'
import LandingLineChart from './landing-charts/LandingLineChart'


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
      <div className="overlay landingDisplay">
        <div className="center">
          <div className="promotion">Organize your schedule and tasks.</div>
          <div className="promotion">Stay in touch with classmates.</div>
          <div><button id="mainButton"
            className="navButtonSignUp"
            onClick={goToSignUp}>Sign Up</button></div>
        </div>
      </div>

      <div className='player-wrapper'>
        <a id="features"></a>
        <div className="rowSection">
          <Row style={{ height: '100%' }}>
            <Col md={6} className="imageCol">
              <img src={laptop2} className="imageInner" />
            </Col>
            <Col md={6} className="textCol">
              <div className="textInner">
                <div className="textHeader">Boost Your Productivity</div>
                <div className="textPara">Study Buddy does more than just manage your tasks. This application allows you to track
                when you study on all your tasks, and easily log a study session. Moreover, tasks can be tracked using a stopwatch, a timer, or
                a quick add for your convenience. All of your time spent is tracked and analyzed, so that you can study better and more effectively.
                </div><div className="textPara">

                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="rowSection">
          <Row style={{ height: '100%' }}>
            <Col md={6} className="textCol">
              <div className="textInner">
                <div className="textHeader">In-Depth Data Analysis</div>
                <div className="textPara">Study Buddy offers in depth analysis on all of your studies. We will help you
                track how you divide your time through the week, across all your subjects, and much more. Not only will we be able to track
                how you study best, we can also track how you stack up against other students in your subjects, faculty, and school.</div>
              </div>
            </Col>
            <Col md={6} className="imageCol">
              <div className="imageInner">
                <LandingBarChart />
              </div>
            </Col>
          </Row>
        </div>
        <a id="premium"></a>
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
                  <div className="textHeader">Stay Connected With Friends</div>
                  <div className="textPara">Use Study Buddy to keep in touch with your classmates through this online semester, and stay on track.
                  With our user activity features, you can study with your friends from your own home. You will be able to see when one of your friends are active
                  and what they are studying on, to make the at home learning experience more enjoyable.
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <a id="futureplan"></a>
          <div className="rowSection">
            <Row style={{ height: '100%' }}>
              <Col md={6} className="textCol">
                <div className="textInner">
                  <div className="textHeader">Future Plans</div>
                  <div className="textPara">Study Buddy is building data to help support students, and their time management.
                  Over time, we hope to build data that will help students find out how many hours they need to get a certain mark, before they
                  even begin the course. Over years of consistent data, we can find trends in marks achieved by students for each class given
                  a certain amount of hours. This, along with much more, is what we hope to bring to you with Study Buddy.
                </div><div className="textPara">

                  </div>
                </div>
              </Col>
              <Col md={6} className="imageCol">
                <img src={futureplans} style={{ width: '50%' }} />
              </Col>
            </Row>
          </div>
          <div className=""><div></div></div>


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