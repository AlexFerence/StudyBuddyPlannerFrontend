import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Nav, Navbar, Button, Form, FormControl, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import laptop from '../assets/laptop.jpg'
import pencils from '../assets/pencils.jpg'

const Landing = ({ history, profile }) => {
    useEffect(() => {
        // if (profile.email) {
        //     history.push('dashboard')
        // }

    }, [])

    return (
        <div className="landing">
            <div className="landingNav">
                <button className="navButton">Header</button>
                <div>
                    <button className="navButton">About</button>
                    <button className="navButton">Features</button>
                    <button className="navButton">Premium</button>
                </div>
            </div>
            <div className="landingDisplay" style={{ backgroundImage: 'url(' + pencils + ')'}}>
                <div>
                <div>Stay on top of your studies.</div>
                <div>Stay on top of your life.</div>
                </div>
            </div>
            <div className="about">
            <Row style={{ height: '100%' }}>
            <Col className="aboutText">
            </Col>
            <Col className="aboutDisplay">
                <img src={laptop} className="laptopImage"/>
            </Col>
            </Row>
            </div>


            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Log In</Link>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        profile: state.profile
    }
}

export default connect(mapStateToProps)(Landing)