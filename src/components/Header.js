import React from 'react'
import { Navbar, Nav, } from 'react-bootstrap'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { FaTachometerAlt, FaCheckSquare, FaChalkboard, FaCog } from 'react-icons/fa'
import {IoIosSpeedometer} from 'react-icons/io'


const Header = (props) => {
    return (
        <Navbar expand="lg">
            <Navbar.Brand className="title" href="/">GradeAid</Navbar.Brand>
            { props.isAuth && <Navbar.Toggle aria-controls="basic-navbar-nav lighten-4" /> }
            <Navbar.Collapse id="">
                <Nav className="mr-auto">
                </Nav>
                <Nav inline="true">
                { props.isAuth && <NavLink style={{padding: 5 }} to="/dashboard"><IoIosSpeedometer /></NavLink> } 
                { props.isAuth && <NavLink style={{padding: 5 }} to="/tasks"><FaCheckSquare /></NavLink> }
                { props.isAuth && <NavLink style={{padding: 5 }} to="/subjects"><FaChalkboard /></NavLink> }
                { props.isAuth && <NavLink style={{padding: 5 }} to="/settings"><FaCog /></NavLink> }
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