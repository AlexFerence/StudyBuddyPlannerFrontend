import React from 'react'
import { Navbar, Nav, } from 'react-bootstrap'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { FaTachometerAlt, FaCheckSquare, FaList, FaCog, FaUsers } from 'react-icons/fa'
import { IoIosSpeedometer, IoMdList } from 'react-icons/io'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import swal from 'sweetalert'
import JoyRide from 'react-joyride';

const TOUR_STEPS = [
    {
      target: "#my-other-step",
      disableBeacon: true,
      content:
        "Bar chart for total order. You can see beautiful graphs here, thanks to creative tim for such UI."
    },
    {
      target: "#features",
      content:
        "Bar chart for total order. You can see beautiful graphs here, thanks to creative tim for such UI."
    }
  ];


const Header = (props, { isRunning }) => {

    const renderTooltipDash = (props, display) => {
        return (
            <Tooltip id="button-tooltip" {...props}>
                Dashboard
            </Tooltip>
        );
    }
    const renderTooltipCompare = (props, display) => {
        return (
            <Tooltip id="button-tooltip" {...props}>
                Compare
            </Tooltip>
        );
    }
    const renderTooltipSet = (props, display) => {
        return (
            <Tooltip id="button-tooltip" {...props}>
                Settings
            </Tooltip>
        );
    }
    const renderTooltipSubj = (props, display) => {
        return (
            <Tooltip id="button-tooltip" {...props}>
                Subjects
            </Tooltip>
        );
    }
    const renderTooltipTask = (props, display) => {
        return (
            <Tooltip id="button-tooltip" {...props}>
                Tasks
            </Tooltip>
        );
    }

    const checkRunningDash = () => {
        if (isRunning) {
            swal({
                title: "Can't switch tasks during study session",
                icon: "info",
                buttons: true,
                dangerMode: true,
            })
        }
        else {
            props.history.push()
        }
    }


    if (props.profile.isAuth) {
        return (
            <div>
            <Navbar fixed="top" expand="true">
                <Navbar.Brand className="title" href="/">StudyBuddy</Navbar.Brand>
                {false && <Navbar.Toggle aria-controls="basic-navbar-nav lighten-4" />}
                <Navbar id="">
                    <Nav className="mr-auto">
                    </Nav>
                    <Nav  inline="true">
                        {!props.isRunning ?
                            <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltipDash}
                            >   
                            
                            <NavLink id="dashboard" style={{ padding: 5 }} to="/dashboard"><IoIosSpeedometer /></NavLink>
                            </OverlayTrigger>

                            :
                            <div className ="navbarIcon"
                            onClick={() => {
                                console.log('onSwitch')
                                swal({
                                    title: "Can't switch tabs during study session",
                                    icon: "info",
                                    buttons: true,
                                    dangerMode: true,
                                })
                                
                            }}
                            id="tasks" style={{ padding: 5 }} ><IoIosSpeedometer />
                        </div>
                        }
                        {!props.isRunning ?
                            <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltipCompare}
                            >   
                            
                            <NavLink id="dashboard" style={{ padding: 5 }} to="/compare"><FaUsers /></NavLink>
                            </OverlayTrigger>

                            :
                            <div className ="navbarIcon"
                            onClick={() => {
                                console.log('onSwitch')
                                swal({
                                    title: "Can't switch tabs during study session",
                                    icon: "info",
                                    buttons: true,
                                    dangerMode: true,
                                })
                                
                            }}
                            id="tasks" style={{ padding: 5 }} ><IoIosSpeedometer />
                        </div>
                        }
                        {!props.isRunning ?
                            <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltipTask}
                            >
                                
                                 <NavLink id="tasks" style={{ padding: 5 }} to="/tasks"><FaCheckSquare />
                                </NavLink>
                                
                            </OverlayTrigger>:

                            <div className ="navbarIcon"
                                onClick={() => {
                                    console.log('onSwitch')
                                    swal({
                                        title: "Can't switch tabs during study session",
                                        icon: "info",
                                        buttons: true,
                                        dangerMode: true,
                                    })
                                    
                                }}
                                id="tasks" style={{ padding: 5 }} ><FaCheckSquare />
                            </div>
                        }
                        {!props.isRunning ?
                            <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltipSubj}
                            >
                            <NavLink id="subjects" style={{ padding: 5 }} to="/subjects"><FaList />
                            </NavLink>
                            </OverlayTrigger>
                            :
                            <div className ="navbarIcon"
                            onClick={() => {
                                console.log('onSwitch')
                                swal({
                                    title: "Can't switch tabs during study session",
                                    icon: "info",
                                    buttons: true,
                                    dangerMode: true,
                                })
                                
                            }}
                            id="tasks" style={{ padding: 5 }} ><FaList />
                        </div>

                        }
                        {!props.isRunning ?
                            <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltipSet}
                            >
                            <NavLink id='settings' style={{ padding: 5 }} to="/settings"><FaCog />
                            </NavLink>
                            </OverlayTrigger>
                            :
                            <div className ="navbarIcon"
                            onClick={() => {
                                console.log('onSwitch')
                                swal({
                                    title: "Can't switch tabs during study session",
                                    icon: "info",
                                    buttons: true,
                                    dangerMode: true,
                                })
                                
                            }}
                            id="tasks" style={{ padding: 5 }} ><FaCog />
                            </div>

                        }
                    </Nav>
                </Navbar>
            </Navbar>
            <Navbar expand="true">
                <Navbar.Brand className="title" href="/">StudyBuddy</Navbar.Brand>
                {false && <Navbar.Toggle aria-controls="basic-navbar-nav lighten-4" />}
                <Navbar id="">
                    <Nav className="mr-auto">
                    </Nav>
                    <Nav  inline="true">
                        {props.isAuth &&
                            <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltipTask}
                            >
                                <NavLink style={{ padding: 5 }} to="/tasks"><FaCheckSquare />
                                </NavLink>
                            </OverlayTrigger>
                        }
                    </Nav>
                </Navbar>
            </Navbar>
            </div>
        )
    }
    else {
        return(<div></div>)
    }
}
const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        isAuth: state.profile.isAuth,
        isRunning: state.running.isRunning,
    }
}
export default connect(mapStateToProps)(Header)