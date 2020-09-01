import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import url from '../environment/url'
import SubjectButton from './SubjectButton'
import { fillSubjects } from '../actions/subjectActions'
import { deleteSubject } from '../actions/subjectActions'
import { FaTrashAlt, FaEdit, FaCreditCard, FaTag } from 'react-icons/fa'
import { IoMdSchool } from 'react-icons/io'
import SubjectModal from './SubjectModal'
import { Row, Col } from 'react-bootstrap'
import { CirclePicker } from 'react-color'
import { loadSubjects } from '../thunks/userActivityThunk'
import { editSubjectThunk } from '../thunks/subjectThunk'
import { loadSubjectBreakdown } from '../thunks/chartThunk'
import ReactEcharts from 'echarts-for-react'
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import { modifyProfile } from '../actions/profileActions'
import { turnOffSubjectTour } from '../thunks/profileThunk'
import CustomOverlay from '../components/CustomOverlay'

const TOUR_STEPS = [
    {
        target: "#addButton",
        content: 'First, add all of your subjects for this semester.',
        disableBeacon: true,
        disableOverlay: true
    },
    {
        target: "#tasks",
        content:
            "Next let's head over to tasks...",
        locale: {
            last: 'Next'
        },
        disableOverlay: true
    },


];


const SubjectsPage = ({ token, id, profile, dispatch, history, width, subjects, charts, tasks }) => {
    var [openModal, setOpenModal] = useState(false)
    //var [classes, setClasses] = useState([])
    var [classSelection, setClassSelection] = useState({})
    var [newChanges, setNewChanges] = useState({})
    var [editMode, setEditMode] = useState(false)

    var [steps, setSteps] = useState(TOUR_STEPS)
    var [stepIndex, setStepIndex] = useState(0)
    var [run, setRun] = useState(true);

    useEffect(() => {
        console.log(width)
    }, [width])


    useEffect(() => {
        setNewChanges({ ...newChanges, color: { hex: "#2b2b2b" } })
        const getClasses = async () => {
            try {
                const res = await axios.post(url + '/api/subjects/list',
                    {
                        UserId: id
                    }, {
                    headers: {
                        'Authorization': 'bearer ' + token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                const list = res.data

                dispatch(fillSubjects(list))
            }
            catch (e) {
                console.log('caught errors')
                console.log(e)
            }
        }
        getClasses()
    }, [])

    const callDelete = async (id) => {
        try {
            const res = await axios.delete(url + '/api/subjects/' + id,
                {
                    headers: {
                        'Authorization': 'bearer ' + token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
            if (res.data === true) {
                console.log('should delete in redux')
                dispatch(deleteSubject(id))
                setClassSelection({})
            }
        } catch (e) {
            console.log(e)
        }
    }

    const closeModal = () => {
        setOpenModal(false)
    }

    const submitEdits = async (e) => {
        e.preventDefault()
        dispatch(editSubjectThunk({
            Name: newChanges.name.toUpperCase().trim(),
            ClassCode: newChanges.classCode,
            Description: newChanges.description.trim(),
            Professor: newChanges.professor.trim(),
            Credits: newChanges.credits,
            UserId: id,
            color: newChanges.color,
        }, classSelection))
        setClassSelection(newChanges)
        setEditMode(false)

    }

    const handleJoyrideCallback = data => {
        const { action, index, status, type } = data;

        if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
            // Update state to advance the tour
            setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1))
        }
        else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            // Need to set our running state to false, so we can restart if we click start again.
            setRun(false)

            history.push("/tasks")
            //turn off tour locally
            dispatch(modifyProfile({ subjectTour: 1 }))
            //turn off in server
            dispatch(turnOffSubjectTour())
        }

        console.groupCollapsed(type);
        console.log(data); //eslint-disable-line no-console
        console.groupEnd();
    };

    return (
        <Row className="subjects" style={(width < 1000) ? {
            paddingRight: '0px'
        } : {
                border:
                    '0px solid blue',
                paddingRight: '300px'
            }}>
            <Joyride steps={TOUR_STEPS}
                continuous={true} showSkipButton={true}
                callback={handleJoyrideCallback}
                run={profile.subjectTour === 0}
                styles={{
                    options: {
                        primaryColor: '#fb4033'
                    },
                    buttonClose: {
                        display: 'none',
                    },

                }}
            />

            <SubjectModal isOpen={openModal} closeModal={closeModal}
            />
            <Col style={{ padding: '0px' }}
                xs={12} s={12} md={6} lg={6}
                className="scroller">
                <div className="classHeader">
                    <div className="left">
                        <div className="title">Subjects</div>
                    </div>
                    <div className="right">
                        <button id="addButton" onClick={() => setOpenModal(true)}>+ Add</button>
                    </div>
                </div>
                <div className="listClasses">{subjects.map((item) => {
                    return (<div
                        onClick={() => {
                            console.log(item.id)
                            setEditMode(false)
                            setClassSelection(item)
                            dispatch(loadSubjectBreakdown(item.id))

                        }} key={item.id}>
                        <SubjectButton
                            className="button"
                            item={item}
                            setClassSelection={setClassSelection}
                        /></div>
                    )
                })}</div>
            </Col>
            <Col style={{ padding: '0px' }}
                xs={12} s={12} md={6} lg={6} className="display">
                {!classSelection.id && subjects.length === 0 && <CustomOverlay message="Add a subject to get started" />}
                <div className="innerDisplay">
                    {classSelection.id &&
                        <div className="topBar" style={{ backgroundColor: (!editMode ? classSelection.color : newChanges.color) }} >
                            {editMode ? <div className="idTitle">EDIT</div> : <div className="idTitle">{classSelection.name} {classSelection.classCode}</div>}
                            <div>
                                <button
                                    className="icon"
                                    onClick={() => {
                                        setEditMode(!editMode)
                                        setNewChanges(classSelection)
                                        //props.dispatch(loadSubjectBreakdown())
                                    }}
                                ><FaEdit /></button>
                                <button
                                    className="icon"
                                    onClick={() => {
                                        callDelete(classSelection.id)
                                    }}
                                ><FaTrashAlt /></button>
                            </div>


                        </div>
                    }
                    {classSelection.id && !editMode &&
                        <div className="mainSection">
                            <Row>
                                <Col md={6}>
                                    <div className="tidbits">
                                        <FaTag />
                                        <span className="subjects__sub-text">{classSelection.description}</span> <br />
                                    </div>
                                    <div className="tidbits">
                                        <FaCreditCard />
                                        <span className="subjects__sub-text"> {classSelection.credits}</span> <span style={{ marginLeft: '4px' }} className="subjects__sub-text">Credits</span>
                                    </div>
                                    <div className="tidbits">
                                        <IoMdSchool />
                                        <span className="subjects__sub-text">{classSelection.professor}</span> <br />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    {charts.breakdownChart.length === 0 ?
                                        <div className="noData">
                                            <div>
                                                No Data
                                            <div className="subNoData">Create subjects to view subject breakdown</div>
                                            </div>
                                        </div> :
                                        <ReactEcharts
                                            option={{
                                                title: {
                                                    text: "Task Type Breakdown",
                                                    textStyle: {
                                                        fontSize: 15
                                                    },
                                                    x: 'center',
                                                    top: 20
                                                },
                                                tooltip: {},
                                                series: [
                                                    {
                                                        type: 'pie',
                                                        radius: '65%',
                                                        center: ['50%', '50%'],
                                                        selectedMode: 'single',
                                                        data:
                                                            charts.breakdownChart
                                                        ,
                                                        emphasis: {
                                                            itemStyle: {
                                                                shadowBlur: 10,
                                                                shadowOffsetX: 0,
                                                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                                                            }
                                                        }
                                                    }
                                                ]

                                            }}
                                        />
                                    }
                                </Col>
                            </Row>


                        </div>
                    }
                    {(classSelection.id) && editMode &&
                        <div className="mainSection">
                            <form className="edits" onSubmit={submitEdits}>
                                <Row>
                                    <Col>
                                        <label>Name:</label>
                                        <input
                                            className="inp"
                                            type="text"
                                            value={newChanges.name}
                                            onChange={(e) => {
                                                if (true) {
                                                    setNewChanges({ ...newChanges, name: e.target.value.toUpperCase() })
                                                }
                                            }}
                                        />
                                        <label className="inpLabel">Class Code: </label>
                                        <input
                                            className="inp"
                                            type="text"
                                            value={newChanges.classCode}
                                            onChange={(e) => {
                                                if (!isNaN(e.target.value) && e.target.value < 999) {
                                                    setNewChanges({ ...newChanges, classCode: e.target.value })
                                                }
                                            }}
                                        />
                                        <label className="inpLabel">Credits:</label>
                                        <input
                                            className="inp"
                                            type="text" value={newChanges.credits}
                                            onChange={(e) => {
                                                if (!isNaN(e.target.value) && e.target.value < 10) {
                                                    setNewChanges({ ...newChanges, credits: e.target.value })
                                                }
                                            }} />
                                    </Col>
                                    <Col className="circlePickerDisplay">
                                        <CirclePicker
                                            width="210px"
                                            height="30px"
                                            color={newChanges.color}
                                            onChangeComplete={(c) => setNewChanges({ ...newChanges, color: c.hex })}
                                            circleSpacing={14}
                                        />
                                    </Col>
                                </Row>

                                <label className="inpLabel">Description:</label>
                                <input
                                    className="inp"
                                    type="text"
                                    value={newChanges.description}
                                    onChange={(e) => setNewChanges({ ...newChanges, description: e.target.value })}
                                /> <br />
                                <label className="inpLabel">Professor:</label>
                                <input
                                    className="inp"
                                    type="text" value={newChanges.professor}
                                    onChange={(e) => {
                                        setNewChanges({ ...newChanges, professor: e.target.value })
                                    }} /> <br />

                                <br />
                                <button className="but">Submit</button>
                            </form>
                        </div>
                    }
                </div>


            </Col>
        </Row>



    )
}

const mapStateToProps = (state) => {
    return {
        token: state.profile.token,
        id: state.profile.id,
        subjects: state.subjects,
        charts: state.charts,
        profile: state.profile,
        width: state.width,
    }
}

export default connect(mapStateToProps)(SubjectsPage)

