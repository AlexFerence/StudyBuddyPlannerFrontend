import React from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'

const Header = (props) => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Planner</Navbar.Brand>
            { props.isAuth && <Navbar.Toggle aria-controls="basic-navbar-nav" /> }
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
    
                <Nav inline>
                { true && <Nav.Link> <NavLink to="/dashboard">Dashboard</NavLink></Nav.Link> } 
                { true && <Nav.Link> <NavLink to="/calendar">Calendar</NavLink> </Nav.Link> }
                { props.isAuth && <Nav.Link> <NavLink to="/tasks">Tasks</NavLink></Nav.Link> }
                { props.isAuth && <Nav.Link> <NavLink to="/analytics">Analytics</NavLink></Nav.Link> }
                { props.isAuth && <Nav.Link> <NavLink to="/settings">Settings</NavLink></Nav.Link> }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.profile.isAuth
    }
}

export default connect(mapStateToProps)(Header)