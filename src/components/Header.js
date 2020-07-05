import React from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'

const Header = (props) => {
    return (
        <Navbar expand="lg">
            <Navbar.Brand href="#home">Planner</Navbar.Brand>
            { true && <Navbar.Toggle aria-controls="basic-navbar-nav lighten-4" /> }
            <Navbar.Collapse id="">
                <Nav className="mr-auto">
                </Nav>
    
                <Nav inline>
                { true && <Nav.Link> <NavLink to="/dashboard">Dashboard</NavLink></Nav.Link> } 
                { true && <Nav.Link> <NavLink to="/calendar">Calendar</NavLink> </Nav.Link> }
                { true && <Nav.Link> <NavLink to="/tasks">Tasks</NavLink></Nav.Link> }
                { true && <Nav.Link> <NavLink to="/analytics">Analytics</NavLink></Nav.Link> }
                { true && <Nav.Link> <NavLink to="/settings">Settings</NavLink></Nav.Link> }
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