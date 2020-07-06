import React from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'

const Header = (props) => {
    return (
        <Navbar expand="lg">
            <Navbar.Brand href="/">Planner</Navbar.Brand>
            { props.isAuth && <Navbar.Toggle aria-controls="basic-navbar-nav lighten-4" /> }
            <Navbar.Collapse id="">
                <Nav className="mr-auto">
                </Nav>
    
                <Nav inline="true">
                { props.isAuth && <NavLink style={{padding: 5 }} to="/dashboard">Dashboard</NavLink> } 
                { props.isAuth && <NavLink style={{padding: 5 }} to="/calendar">Calendar</NavLink>}
                { props.isAuth && <NavLink style={{padding: 5 }} to="/tasks">Tasks</NavLink> }
                { props.isAuth && <NavLink style={{padding: 5 }} to="/analytics">Analytics</NavLink> }
                { props.isAuth && <NavLink style={{padding: 5 }} to="/settings">Settings</NavLink> }
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