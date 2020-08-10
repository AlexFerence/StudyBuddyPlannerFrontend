import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Nav, Navbar, Button, Form, FormControl, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import laptop from '../assets/laptop.png'
import laptop2 from '../assets/laptop2.png'
import timer from '../assets/timer.png'
//import pencils from '../assets/video.mp4'
import ReactEcharts from 'echarts-for-react'
import ReactPlayer from 'react-player'
import JoyRide from 'react-joyride';

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

const Landing = ({ history, profile }) => {
  
  var [run, setRun] = useState(false)
  
  useEffect(() => {
    if (profile.email) {
      history.push('/dashboard')
  }
  }, [])

  const goToSignUp = () => {
    history.push("/signup")
  }

  return (
    <div className="landing" id="#my-first-step" target="_blank">
      
    <JoyRide steps={TOUR_STEPS} continuous={true} showSkipButton={true} />
      <div className="landingNav">
        <button id="brand" className="navButton">StudyBuddy</button>
        <div>
          <a className="navButton" href="#features">About</a>
          <a className="navButton" href="#about">Features</a>
          <a className="navButton" href="#premium">Premium</a>
          <a className="navButton" href="#premium">Future Plan</a>
          <button className="navButtonSignUp"
            onClick={goToSignUp}
          >Sign Up</button>
        </div>
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
            <div className="promotion">Organize your classes and tasks.</div>
            <div className="promotion">Real Time analytics and comparisons.</div>
            <div><button id="mainButton"
              className="navButtonSignUp"
              onClick={goToSignUp}>Sign Up</button></div>

          </div>
        </div>

      <div className='player-wrapper'>

      <a id="features"></a>
        <div className="rowSection">
          <Row style={{ height: '100%' }}>
            <Col md={6} className="textCol">
              <div className="textInner">
                <div className="textHeader">About Us</div>
                <div className="textPara">    omiešal ich, aby tak vytvoril vzorkovú knihu. Prežil nielen päť storočí,
                ale aj skok do elektronickej sadzby, a pritom zostal v podstate nezmenený.
                Spopularizovaný bol v</div><div className="textPara">

                  60-tych rokoch 20.storočia, vydaním hárkov Letraset, ktoré obsahovali
                pasáže Loreorem Ipsum.</div>
              </div>
            </Col>
            <Col className="imageCol" >
              <img src={laptop} className="imageInner" />
            </Col>
          </Row>
        </div>
        <a id="about"></a>
        <div className="rowSection">
          <Row style={{ height: '100%' }}>
            <Col md={6} className="imageCol">
            <img src={laptop2} className="imageInner" />
            </Col>
            <Col md={6} className="textCol">
              <div className="textInner">
                <div className="textHeader">Features</div>
                <div className="textPara">UniBuddy provides its users with all essenial
                resources that a student needs to track their study habits. This includes Timers, stopwatches and 
                time input fields all automatically correlated to the analytical graphs.
                </div><div className="textPara">

                  </div>
              </div>
            </Col>
          </Row>
        </div>
        <a id="premium"></a>
        <div className="rowSection">
          <Row style={{ height: '100%' }}>
            <Col md={6} className="textCol">
              <div className="textInner">
                <div className="textHeader">In-Depth Data Analysis.</div>
                <div className="textPara">Study Buddy offers in depth analysis on all of your studies. Let us do the work for you. We will help you
                track how you divide your time through the week, across all your subjects, and much more.</div>
              </div>
            </Col>
            <Col md={6} className="imageCol">
              <div className="imageInner">
                <ReactEcharts
                  option={{
                    xAxis: {
                      type: 'category',
                      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                      axisLine: {
                        lineStyle: {
                          color: '#FFF'
                        }
                      }
                    },
                    yAxis: {
                      type: 'value',
                      axisLine: {
                        lineStyle: {
                          color: '#FFF'
                        }
                      },
                      name: 'hours',
                      nameLocation: 'middle',
                      nameGap: 35
                    },
                    series: [{
                      data: [4, 5, 3.5, 5.5, 2, 3, 6],
                      type: 'bar'
                    }]
                  }}
                />
              </div>
            </Col>
          </Row>
          <div className="rowSection">
            <Row style={{ height: '100%' }}>
              <Col md={6} className="imageCol">
                <div className="imageInner">
                  <ReactEcharts
                    option={{
                      xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        axisLine: {
                          lineStyle: {
                            color: '#FFF'
                          }
                        }
                      },
                      yAxis: {
                        type: 'value',
                        axisLine: {
                          lineStyle: {
                            color: '#FFF'
                          }
                        },
                        name: 'hours',
                        nameLocation: 'middle',
                        nameGap: 35
                      },
                      series: [{
                        data: [4, 5, 3.5, 5.5, 2, 3, 6],
                        type: 'line'
                      },
                      {
                        color: '#add8e6',
                        data: [1, 4, 2, 3.5, 6, 4, 3],
                        type: 'line'
                      }
                      ]
                    }}
                  />
                </div>
              </Col>
              <Col md={6} className="textCol">
                <div className="textInner">
                  <div className="textHeader">Compare your work to others.</div>
                  <div className="textPara">omiešal ich, aby tak vytvoril vzorkovú knihu. Prežil nielen päť storočí,
                  ale aj skok do elektronickej sadzby, a pritom zostal v podstate nezmenený.
                Spopularizovaný bol v</div><div className="textPara">

                    60-tych rokoch 20.storočia, vydaním hárkov Letraset, ktoré obsahovali
                pasáže Loreorem Ipsum.</div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
}

export default connect(mapStateToProps)(Landing)