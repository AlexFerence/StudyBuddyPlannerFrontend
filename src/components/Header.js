import React from 'react'
import { Navbar, Nav, } from 'react-bootstrap'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { FaTachometerAlt, FaCheckSquare, FaList, FaCog } from 'react-icons/fa'
import {IoIosSpeedometer, IoMdList} from 'react-icons/io'


const Header = (props) => {
    return (
        <Navbar expand="true">
            <Navbar.Brand className="title" href="/">GradeAid</Navbar.Brand>
            { false && <Navbar.Toggle aria-controls="basic-navbar-nav lighten-4" /> }
            <Navbar id="">
                <Nav className="mr-auto">
                </Nav>
                <Nav inline="true">
                { props.isAuth && <NavLink style={{padding: 5 }} to="/dashboard"><IoIosSpeedometer /></NavLink> } 
                { props.isAuth && <NavLink style={{padding: 5 }} to="/tasks"><FaCheckSquare /></NavLink> }
                { props.isAuth && <NavLink style={{padding: 5 }} to="/subjects"><FaList /></NavLink> }
                { props.isAuth && <NavLink style={{padding: 5 }} to="/settings"><FaCog /></NavLink> }
                </Nav>
            </Navbar>
        </Navbar>
    )
}
const mapStateToProps = (state) => {
    return {
        isAuth: state.profile.isAuth
    }
}
export default connect(mapStateToProps)(Header)