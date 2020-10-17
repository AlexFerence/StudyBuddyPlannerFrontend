import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import laptop2 from '../assets/laptop2.png'
import futureplans from '../assets/futureplans.png'
//import pencils from '../assets/video.mp4'
import JoyRide from 'react-joyride';
import LandingNav from './LandingNavBar'
import LandingLineChart from './landing-charts/LandingLineChart'
import OverviewBar from './admin-components/OverviewBar'
import InstagramEmbed from 'react-instagram-embed';
import SampleFriendItem from './landing-charts/SampleFriendItem'
import { loadIGFeed } from '../thunks/landingThunk'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import "react-multi-carousel/lib/styles.css";
import LandingCarousel from './landing-carousel'
import LandingCarouselTestemonial from './landing-quotes-carousel'

const Landing = ({ history, profile, dispatch, width }) => {

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
      <div className="landingNav" style={{ padding: '0px' }}>
        <LandingNav />
      </div>
      <div className="landingDisplay">
        <video id="background-video" loop autoPlay muted>
          <source src="/videos/landingVideo.mp4" type="video/mp4" />
          <source src="/videos/landingVideo.mp4" type="video/ogg" />
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
        <a id="getstarted"></a>

        <div className="rowSection">
          <div style={{ height: '40px' }}></div>
          <Row style={{ height: '100%' }}>
            <Col md={6} className="textCol">
              <div className="textInner">
                <div className="textHeader">Get Started</div>
                <div className="get-started-list-item"><div className="get-started-list-num">1</div> Add Your Subjects</div>
                <div className="get-started-list-item"><div className="get-started-list-num">2</div>Add Your Tasks</div>
                <div className="get-started-list-item"><div className="get-started-list-num">3</div>Add Your Friends</div>
                <div className="get-started-list-item"><div className="get-started-list-num">4</div>Start the timer and get studying!</div>
              </div>
            </Col>
            <Col md={6} className="imageCol">
              <img src={laptop2} className="imageInner" />
            </Col>
          </Row>
        </div>
        <div className="rowSection" id="align-center">
          <Row style={{ height: '100%' }}>
            <Col md={6} className="textCol">
              <div className="textInner">
                <div className="textHeader">Stay Connected</div>
                <div className="textPara">Studying is always better with friends. We provide the ability for users to view what their friends
                are studying, and let them feel connected even when studying remotely.</div>
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
          <a id="testemonials"></a>
          <div id="align-center" className="rowSection">
            {width > 500 ? <LandingCarouselTestemonial /> :
              <div><div style={{display: 'flex',  justifyContent: 'center' }}>
                <div className="textInner testimonial-card">
                  <div className="testemonial-card-inner">
                    <div style={{ color: 'white' }} className="textHeader">
                      " It appeases the part of the brain that craves checking things off. "
                  </div>
                    <div className="textPara">- Havana Garcha</div>
                  </div>
                </div>
              </div>
                            <div style={{display: 'flex',  justifyContent: 'center' }}>
                            <div className="textInner testimonial-card">
                              <div className="testemonial-card-inner">
                                <div style={{ color: 'white' }} className="textHeader">
                                  " StudyBuddy keeps me studying for a lot longer than I used to. "
                              </div>
                                <div className="textPara">- Vlad Stets</div>
                              </div>
                            </div>
                          </div></div>
            }
          </div>
          <div style={{ height: '60px' }} />
          <div className="instagram-embed-row">
            {width > 500 ? <LandingCarousel /> :
              <div> <InstagramEmbed
                url='https://www.instagram.com/p/CGVziyGnP_W/'
                maxWidth={340}
                hideCaption={true}
                containerTagName='div'
                protocol=''
                injectScript
                onLoading={() => { }}
                onSuccess={() => { }}
                onAfterRender={() => { }}
                onFailure={() => { }}
              />

                  <InstagramEmbed
                url='https://www.instagram.com/p/CGVziyGnP_W/'
                maxWidth={340}
                hideCaption={true}
                containerTagName='div'
                protocol=''
                injectScript
                onLoading={() => { }}
                onSuccess={() => { }}
                onAfterRender={() => { }}
                onFailure={() => { }}
              /></div>

            }

          </div>
          <Row>
            <Col md={6} className="imageCol">
              <div style={{ height: '100px' }}></div>
              <button id="mainButton"
                className="navButtonSignUp"
                onClick={goToSignUp}>Sign Up</button>
              { /* <img src={futureplans} style={{ width: '50%' }} /> */}
            </Col>
          </Row>
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


// <div className="rowSection">
//             <Row style={{ height: '100%' }}>
//               <Col md={6} className="imageCol">
//                 <div className="imageInner">
//                   <LandingLineChart />
//                 </div>
//               </Col>
//               <Col md={6} className="textCol">
//                 <div className="textInner">
//                   <div className="textHeader">Track Your Studying</div>
//                   <div className="textPara">StudyBuddy provides various methods to easily track your study time. Our team's software then generates visually
//                   relevant and significant graphs to show the user their progress and study habits. These statistics help you break up your time and study more
//                   efficiently in the future.
//                   </div>
//                 </div>
//               </Col>
//             </Row>
//           </div>



// <Carousel responsive={responsive}>
//                   {instagramLinks.map((link) => {
//                     return (
//                       <div>
//                         <InstagramEmbed
//                           key={link}
//                           url={link}
//                           maxWidth={400}
//                           hideCaption={true}
//                           containerTagName='div'
//                           protocol=''
//                           injectScript
//                           onLoading={() => { }}
//                           onSuccess={() => { }}
//                           onAfterRender={() => { }}
//                           onFailure={() => { }}
//                         />
//                       </div>
//                     )
//                   })
//                   }
//                 </Carousel>




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
