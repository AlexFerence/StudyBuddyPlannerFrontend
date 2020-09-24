import React from 'react'
import { connect } from 'react-redux'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import icon from '../assets/whiteSB.png'

const LandingNav = ({ history, width }) => {

    const goToSignUp = () => {
        history.push("/signup")
    }

    return (
        <Navbar expand="md" style={width < 768 ? {
            fontSize: '12px',
            width: '100%',
            backgroundColor: '#2b2b2b',
        } : {
                fontSize: '12px',
                width: '100%',
                backgroundColor: 'transparent',
            }}>
            <Navbar.Brand id="landing-nav-title" style={{ color: 'white', textTransform: 'Capitalize' }} href="#home">
                <img alt="Study Buddy Logo" src={icon} style={{ height: '25px', width: '25px', marginRight: '5px' }} className="imageInner" />
                <span style={{ paddingTop: '6px' }}>StudyBuddy</span>
            </Navbar.Brand>
            <Navbar.Toggle style={{ color: 'white' }} aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
                <Nav className="nav-right">
                    <NavDropdown.Item id="navBut" className="navButton" href="#features">Get Started</NavDropdown.Item>
                    <NavDropdown.Item id="navBut" className="navButton" href="#premium">Features</NavDropdown.Item>
                    <NavDropdown.Item id="navBut" className="navButton" href="#futureplan">Testemonials</NavDropdown.Item>
                    <div style={{ minWidth: '60px' }} id="navBut" className="navButton"><Link style={{ paddingRight: '0px', textAlign: 'center', textTransform: 'capitalize', fontSize: '16px' }} to="/login">  Log In</Link></div>
                    <div
                        style={{ minWidth: '140px', color: 'white', textAlign: 'center' }}
                        id="navButSignUp" id="navButtonSignUp"><Link id="navButSignUp" to="/signup" style={{ textTransform: 'capitalize', color: 'white', padding: '5px' }}>Sign Up</Link></div>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        width: state.width
    }
}

export default connect(mapStateToProps)(LandingNav)