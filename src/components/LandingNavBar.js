import React from 'react'
import { connect } from 'react-redux'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const LandingNav = ({ history }) => {

    const goToSignUp = () => {
        history.push("/signup")
    }

    return (
        <Navbar expand="md" style={{
            fontSize: '12px',
            width: '100%',
            backgroundColor: 'transparent',
        }}>
            <Navbar.Brand href="#home">Study Buddy</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
                <Nav className="nav-right">
                    <NavDropdown.Item id="navBut" className="navButton" href="#features">Features</NavDropdown.Item>
                    <NavDropdown.Item id="navBut" className="navButton" href="#premium">Friends</NavDropdown.Item>
                    <NavDropdown.Item id="navBut" className="navButton" href="#futureplan">Future</NavDropdown.Item>
                    <NavDropdown.Item id="navBut" className="navButton"><Link style={{ textTransform: 'capitalize', fontSize: '16px' }} to="/login">Log In</Link></NavDropdown.Item>
                    <NavDropdown.Item
                        style={{ color: 'white' }}
                        id="navButSignUp" id="navButtonSignUp"><Link to="/login" style={{ textTransform: 'capitalize', color: 'white' }}>Sign Up</Link></NavDropdown.Item>

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