import React, { useEffect, useState } from 'react'
import { Navbar, Nav, } from 'react-bootstrap'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { FaCheckSquare, FaList, FaCog, FaUsers } from 'react-icons/fa'
import { IoIosSpeedometer, IoMdList } from 'react-icons/io'
import { BsBellFill } from 'react-icons/bs'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import swal from 'sweetalert'
import icon from '../assets/whiteSB.png'
import moment from 'moment'
import { logout } from '../actions/profileActions'
import { useBeforeunload } from 'react-beforeunload';
import { runningOffThunk } from '../thunks/userActivityThunk'
import ProgressBar from './ProgressBar'

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


const Header = ({ feed, isRunning, width, profile, history, paused, isAuth, dispatch, currentTask = { id: 0 } }) => {

    const [numNotification, setNumNotifications] = useState(0)

    useEffect(() => {
        setNumNotifications(getNumNotifications())
    }, [feed.lastSeen, feed.list])

    const getNumNotifications = () => {
        let { lastSeen = { id: 0 }, list = []
        } = feed
        let count = 0
        for (var x = 0; x < list.length; x++) {
            var item = list[x]
            // console.log(lastSeen.id)
            // console.log(item.id)
            // console.log(lastSeen.id == item.id)
            if (lastSeen.id === item.id) {
                //console.log('SHOULD RETURN')
                break
            }
            else {
                count++
            }
        }
        return count
    }

    useBeforeunload((event) => {
        if (isRunning) {
            event.preventDefault()
            dispatch(runningOffThunk(currentTask.id))
        }
    })

    useEffect(() => {
        if (moment().isAfter(moment(profile.tokenExpiry))) {
            dispatch(logout())
            history.push('/')
        }
    }, [])

    const renderTooltipDash = (props, display) => {
        return (
            <Tooltip id="button-tooltip" {...props}>
                Dashboard
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
    const renderTooltipCompare = (props, display) => {
        return (
            <Tooltip id="button-tooltip" {...props}>
                Feed
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
            history.push()
        }
    }


    if (profile.isAuth) {
        return (
            <div style={(width < 1000) ? { marginRight: '0px' } : { marginRight: '300px' }}>
                <Navbar className="navbar-container" style={(width < 1000) ? { marginRight: '0px' } : { marginRight: '300px' }} fixed="top" expand="true">
                    <Navbar.Brand style={{ color: 'black' }} className="title" href="/"> <img src='/blackSB.png' style={{ height: '25px', width: '25px', marginRight: '5px' }} className="imageInner" /><span style={{ paddingTop: '5px' }}>StudyBuddy</span></Navbar.Brand>

                    <ProgressBar />

                    {false && <Navbar.Toggle aria-controls="basic-navbar-nav lighten-4" />}
                    <Navbar id="">
                        <Nav className="mr-auto">
                        </Nav>
                        <Nav inline="true">
                            {(!isRunning && !paused) ?
                                <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltipDash}
                                >

                                    <NavLink activeStyle={{ color: 'black' }} style={{ padding: 5 }} to="/dashboard"><IoIosSpeedometer /></NavLink>
                                </OverlayTrigger>

                                :
                                <div className="navbarIcon"
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
                            {numNotification > 0 &&
                                <div className='notification-container'>
                                    <div className='notification-circle'>
                                        {numNotification}
                                    </div>
                                </div>
                            }
                            {!isRunning ?
                                <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltipCompare}
                                >
                                    <NavLink activeStyle={{ color: 'black' }} id="dashboard"
                                        style={{ padding: 5 }} to='/feed'>
                                        <BsBellFill />
                                    </NavLink>
                                </OverlayTrigger>
                                :
                                <div className="navbarIcon"
                                    onClick={() => {
                                        console.log('onSwitch')
                                        swal({
                                            title: "Can't switch tabs during study session",
                                            icon: "info",
                                            buttons: true,
                                            dangerMode: true,
                                        })

                                    }}
                                    id="tasks" style={window.location.pathname === "/premium" ?
                                        { padding: 5, color: 'white' } : { padding: 5 }} >
                                    <BsBellFill />
                                </div>

                            }


                            {(!isRunning && !paused) ?
                                <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltipTask}
                                >

                                    <NavLink activeStyle={{ color: 'black' }} id="tasks" style={{ padding: 5 }}
                                        to="/tasks"><FaCheckSquare />
                                    </NavLink>

                                </OverlayTrigger> :

                                <div className="navbarIcon"
                                    onClick={() => {
                                        console.log('onSwitch')
                                        swal({
                                            title: "Can't switch tabs during study session",
                                            icon: "info",
                                            buttons: true,
                                            dangerMode: true,
                                        })

                                    }}
                                    id="tasks" style={window.location.pathname === "/tasks" ?
                                        { padding: 5, color: 'white' } : { padding: 5 }} ><FaCheckSquare />
                                </div>
                            }
                            {(!isRunning && !paused) ?
                                <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltipSubj}
                                >
                                    <NavLink activeStyle={{ color: 'black' }} id="subjects" style={{ padding: 5 }}
                                        to="/subjects"><FaList />
                                    </NavLink>
                                </OverlayTrigger>
                                :
                                <div className="navbarIcon"
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
                            {(!isRunning && !paused) ?
                                <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltipSet}
                                >
                                    <NavLink activeStyle={{ color: 'black' }} id='settings' style={{ padding: 5 }} to="/settings"><FaCog />
                                    </NavLink>
                                </OverlayTrigger>
                                :
                                <div className="navbarIcon"
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
                <Navbar expand="true" style={{ zIndex: 0, backgroundColor: '#F9F9F9', height: '66.4px' }} >
                    <Navbar.Brand className="title" href="/dashboard" style={{ color: '#black' }}>StudyBuddy</Navbar.Brand>
                    {false && <Navbar.Toggle aria-controls="basic-navbar-nav lighten-4" />}
                    <Navbar style={{ backgroundColor: '#F9F9F9' }} >
                        <Nav style={{ backgroundColor: '#F9F9F9' }} className="mr-auto">
                        </Nav>
                        <Nav inline="true" style={{ backgroundColor: '#F9F9F9' }}>
                            {true &&
                                <OverlayTrigger style={{ backgroundColor: '#F9F9F9' }}
                                    placement="bottom"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltipTask}
                                >
                                    <NavLink activeStyle={{ color: '#F9F9F9' }} style={{ padding: 'none', backgroundColor: '#F9F9F9', color: '#F9F9F9' }} to="/tasks"><FaCheckSquare />
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
        return (<div></div>)
    }
}
const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        isAuth: state.profile.isAuth,
        isRunning: state.running.isRunning,
        width: state.width,
        currentTask: state.currentTask,
        paused: state.running.paused,
        feed: state.feed
    }
}
export default connect(mapStateToProps)(Header)

// {!isRunning ?
//     <OverlayTrigger
//         placement="bottom"
//         delay={{ show: 250, hide: 400 }}
//         overlay={renderTooltipCompare}
//     >
//         <NavLink activeStyle={{ color: 'black' }} id="dashboard"
//             style={{ padding: 5 }} to='/premium'>
//             <BsBellFill />
//         </NavLink>
//     </OverlayTrigger>
//     :
//     <div className="navbarIcon"
//         onClick={() => {
//             console.log('onSwitch')
//             swal({
//                 title: "Can't switch tabs during study session",
//                 icon: "info",
//                 buttons: true,
//                 dangerMode: true,
//             })
//         }}
//         id="tasks" style={window.location.pathname === "/premium" ?
//             { padding: 5, color: 'white' } : { padding: 5 }} >
//         <BsBellFill />
//     </div>

// }