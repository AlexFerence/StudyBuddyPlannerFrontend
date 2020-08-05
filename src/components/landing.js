import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Nav, Navbar, Button, Form, FormControl, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import laptop from '../assets/laptop.jpg'
//import pencils from '../assets/video.mp4'
import ReactEcharts from 'echarts-for-react'
import ReactPlayer from 'react-player'


const Landing = ({ history, profile }) => {
  useEffect(() => {


  }, [])

  const goToSignUp = () => {
    history.push("/signup")
  }

  return (
    <div className="landing">
      <div className="landingNav">
        <button id="brand" className="navButton">Peak</button>
        <div>
          <button className="navButton">About</button>
          <button className="navButton">Features</button>
          <button className="navButton">Premium</button>
          <button className="navButtonSignUp"
            onClick={goToSignUp}
          >Sign Up</button>
        </div>
      </div>

      <div className="landingDisplay">
        <video id="background-video" loop autoPlay>
          <source src="/videos/video.mp4" type="video/mp4" />
          <source src="/videos/video.mp4" type="video/ogg" />
            Your browser does not support the video tag.
            </video>
      </div>
      <div class="overlay landingDisplay">
          <div className="center">
            <div className="promotion">Stay on top of your studies.</div>
            <div className="promotion">Stay on top of your life.</div>
            <div><button id="mainButton"
              className="navButtonSignUp"
              onClick={goToSignUp}>Sign Up</button></div>

          </div>
        </div>

      <div className='player-wrapper'>

        
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

        <div className="rowSection">
          <Row style={{ height: '100%' }}>
            <Col md={6} className="imageCol">
              <div className="imageInner">
                <ReactEcharts
                  option={{
                    series: [
                      {
                        type: 'pie',
                        radius: '65%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data: [
                          { name: 'MATH', value: 66 },
                          { name: 'PHYS', value: 33 },
                          { name: 'BIO', value: 44 },
                          { name: 'ENGL', value: 30 },
                          { name: 'HIST', value: 10 },
                        ]
                        ,
                        emphasis: {
                          itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                          }
                        }
                      }
                    ]

                  }}
                />
              </div>
            </Col>
            <Col md={6} className="textCol">
              <div className="textInner">
                <div className="textHeader">Features</div>
                <div className="textPara">omiešal ich, aby tak vytvoril vzorkovú knihu. Prežil nielen päť storočí,
                ale aj skok do elektronickej sadzby, a pritom zostal v podstate nezmenený.
                Spopularizovaný bol v</div><div className="textPara">

                  60-tych rokoch 20.storočia, vydaním hárkov Letraset, ktoré obsahovali
                pasáže Loreorem Ipsum.</div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="rowSection">
          <Row style={{ height: '100%' }}>
            <Col md={6} className="textCol">
              <div className="textInner">
                <div className="textHeader">In-Depth Data Analysis</div>
                <div className="textPara">Peak offers in depth analysis on all of your studies. Let us do the work for you. We will help you
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
                  <div className="textHeader">Features</div>
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