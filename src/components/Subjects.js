import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import url from '../environment/url'
import SubjectButton from './SubjectButton'
import { fillSubjects } from '../actions/subjectActions'
import { deleteSubject } from '../actions/subjectActions'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'
import SubjectModal from './SubjectModal'
import { Row, Col } from 'react-bootstrap'
import { CirclePicker } from 'react-color'
import { loadSubjects } from '../thunks/userActivityThunk'
import { editSubjectThunk } from '../thunks/subjectThunk'
import { loadSubjectBreakdown } from '../thunks/chartThunk'
import ReactEcharts from 'echarts-for-react'
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import { modifyProfile } from '../actions/profileActions'

const TOUR_STEPS = [
    {
        target: "#addButton",
        content: 'First, add all of your subjects for this semester.',
        disableBeacon: true,
    },
    {
        target: "#tasks",
        content:
          "Next let's head over to tasks...",
        locale: {
            last: 'Next'
        }
      },
      

  ];


const SubjectsPage = (props) => {
    var [openModal, setOpenModal] = useState(false)
    //var [classes, setClasses] = useState([])
    var [classSelection, setClassSelection] = useState({})
    var [newChanges, setNewChanges] = useState({})
    var [editMode, setEditMode] = useState(false)

    var [steps, setSteps] = useState(TOUR_STEPS)
    var [stepIndex, setStepIndex] = useState(0)
    var [run, setRun] = useState(true);

    useEffect(() => {
        const getClasses = async () => {
            try {
                const res = await axios.post(url + '/api/subjects/list',
                    {
                        UserId: props.id
                    }, {
                    headers: {
                        'Authorization': 'bearer ' + props.token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                const list = res.data

                props.dispatch(fillSubjects(list))
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
                        'Authorization': 'bearer ' + props.token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
            if (res.data === true) {
                console.log('should delete in redux')
                props.dispatch(deleteSubject(id))
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
        props.dispatch(editSubjectThunk({
            Name: newChanges.name.toUpperCase().trim(),
            ClassCode: newChanges.classCode,
            Description: newChanges.description.trim(),
            Professor: newChanges.professor.trim(),
            Credits: newChanges.credits,
            UserId: props.id,
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

          console.log('doneasdfasdfasdfasdfasdfasfasdfasdfa')
          props.history.push("/tasks")
          props.dispatch(modifyProfile({ subjTour: false }))
        }
    
        console.groupCollapsed(type);
        console.log(data); //eslint-disable-line no-console
        console.groupEnd();
    };

    return (
        <Row className="subjects">
            <Joyride steps={TOUR_STEPS} 
            continuous={true} showSkipButton={true}
            callback={handleJoyrideCallback}
            run={!(props.profile.subjTour !== true)}
            />
            
            <SubjectModal isOpen={openModal} closeModal={closeModal} 
            
            />
            <Col className="scroller">
                <div className="classHeader">
                    <div className="left">
                        <div className="title">Subjects</div>
                    </div>
                    <div className="right">
                        <button id="addButton" onClick={() => setOpenModal(true)}>+ Add</button>
                    </div>
                </div>
                <div className="listClasses">{props.subjects.map((item) => {
                    return (<div 
                        onClick={() => {
                        console.log(item.id)
                        setEditMode(false)
                        setClassSelection(item)
                        props.dispatch(loadSubjectBreakdown(item.id))

                    }} key={item.id}>
                        <SubjectButton
                            className="button"
                            item={item}
                            setClassSelection={setClassSelection}
                        /></div>
                    )
                })}</div>
            </Col>
            <Col className="display">
                {!classSelection.id && <p className="fillerContent">Please select a class</p>}
                <div className="innerDisplay">
                    {classSelection.id &&
                        <div className="topBar">
                            <div className="left" style={{ backgroundColor: (!editMode ? classSelection.color : newChanges.color) }}>
                                {!editMode && <h4>{classSelection.name} {classSelection.classCode}</h4>}
                                {editMode && <h4>EDIT</h4>}
                            </div>
                            <div className="right" style={{ backgroundColor: (!editMode ? classSelection.color : newChanges.color) }}>
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
                                    <span className="">Credits:</span> <span>{classSelection.credits}</span>
                                </div>
                                <div className="tidbits">
                                    <span className="">Professor:</span> <span>{classSelection.professor}</span> <br />
                                </div>
                                <div className="tidbits">
                                    <span className="">Description:</span>  <span>{classSelection.description}</span> <br />
                                </div>
                                </Col>
                                <Col md={6}>
                                    <ReactEcharts
                                        option={{
                                            title : {
                                                text:"Breakdown By Task Type",
                                                x:'center',
                                                top : 20
                                              },
                                            tooltip: {},
                                            series: [
                                                {
                                                    type: 'pie',
                                                    radius: '65%',
                                                    center: ['50%', '50%'],
                                                    selectedMode: 'single',
                                                    data:
                                                        props.charts.breakdownChart
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
                                <label className="inpLabel">Prof:</label>
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
        profile: state.profile
    }
} 

export default connect(mapStateToProps)(SubjectsPage)



// <div className="subjects">
//             <SubjectModal isOpen={openModal} closeModal={closeModal} />           
//             <div className="scroller">
//                 <div className="classHeader">
//                     <div className="left">
//                         <div className="title">Subjects</div>
//                     </div>
//                     <div className="right">
//                         <button onClick={() => setOpenModal(true)}>+ Add</button>
//                     </div>
//                 </div>
//                 <div className="listClasses">{props.subjects.map((item) => {
//                     return (<div onClick={() => {
//                         setEditMode(false)
//                         setClassSelection(item)
//                         console.log('clicked')
//                         console.log(item)
//                         console.log(classSelection)
//                     }} key={item.id}>
//                         <SubjectButton
//                             className="button"
//                             item={item}
//                             setClassSelection={setClassSelection}
//                         /></div>
//                     )
//                 })}</div>

//             </div>
//             <div className="display">
//                 {!classSelection.id && <p>Please select a class</p>}
//                 <div className="innerDisplay">
//                     { classSelection.id && 
//                         <div className="topBar">
//                             <div className="left">
//                                 { !editMode && <h4>{classSelection.name} {classSelection.classCode}</h4> }
//                                 { editMode && <h4>EDIT</h4>}
//                             </div>
//                             <div className="right">
//                             <button 
//                             className="icon"
//                             onClick={() => {
//                                 setEditMode(!editMode)
//                                 setNewChanges(classSelection)
//                             }}
//                             ><FaEdit /></button>
//                             <button 
//                             className="icon"
//                             onClick={() => {
//                                 callDelete(classSelection.id)
//                             }}
//                             ><FaTrashAlt /></button>
                            
//                             </div>
//                         </div>
//                     }
//                     {classSelection.id && !editMode &&
//                         <div className="mainSection">
//                             Credits: <span>{classSelection.credits}</span> <br/>
//                             Professor: <span>{classSelection.professor}</span> <br/>
//                             Description: <span>{classSelection.description}</span> <br/>
                            
//                         </div>
//                     }
//                     {( classSelection.id) && editMode && 
//                         <div className="mainSection">
//                             <form className="edits" onSubmit={submitEdits}>
//                                 Name: <input 
//                                     type="text" 
//                                     value={newChanges.name}
//                                     onChange={(e) => {
//                                         if (true) {
//                                             setNewChanges({...newChanges, name: e.target.value.toUpperCase()})
//                                         }
//                                         }} 
//                                     /> <br/>
//                                 Class Code: <input type="text" value={newChanges.classCode} 
//                                 onChange={(e) => {
//                                     if (!isNaN(e.target.value) && e.target.value < 999) {
//                                         setNewChanges({...newChanges, classCode: e.target.value})
//                                     }}}
//                                 /> <br/>
//                                 Description: <input type="text" value={newChanges.description} 
//                                     onChange={(e) => setNewChanges({...newChanges, description: e.target.value})}
//                                 /> <br/>
//                                 Prof: <input type="text" value={newChanges.professor} 
//                                     onChange={(e) => {
//                                         setNewChanges({...newChanges, professor: e.target.value })
//                                     }} /> <br />
//                                 Credits: <input type="text" value={newChanges.credits}
//                                     onChange={(e) => {
//                                         if (!isNaN(e.target.value) && e.target.value < 10) {
//                                             setNewChanges({...newChanges, credits: e.target.value })
//                                         }
//                                     }} /> 
//                                     <br />
//                                 <button className="button">Submit</button>
//                             </form>
//                         </div>
//                     }
//                 </div>
//             </div>
//         </div>