import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Nav, Navbar, Button, Form, FormControl, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import laptop from '../assets/laptop.jpg'

const Landing = ({ history, profile }) => {
    useEffect(() => {
        // if (profile.email) {
        //     history.push('dashboard')
        // }

    }, [])

    return (
        <div className="landing">
            <Navbar sticky="top">
                <Navbar.Brand href="#home">Peak</Navbar.Brand>
                <Nav className="mr-auto">
                    
                </Nav>
                <Form inline>
                    <Nav.Link href="#home">About</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Form>
            </Navbar>

            <div className="landingDisplay">

            </div>

            <div className="about">
            <Row>
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