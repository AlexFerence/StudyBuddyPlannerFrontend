import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import url from '../environment/url'
import SubjectButton from './SubjectButton'
import { fillSubjects } from '../actions/subjectActions'
import { deleteSubject } from '../actions/subjectActions'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'
import SubjectModal from './SubjectModal'



const SubjectsPage = (props) => {
    var [openModal, setOpenModal] = useState(false)
    //var [classes, setClasses] = useState([])
    var [classSelection, setClassSelection] = useState({})
    var [newChanges, setNewChanges] = useState({})
    var [editMode, setEditMode] = useState(false)

    
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

    useEffect(() => {
        const getClassesi = async () => {
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
        getClassesi()
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
        try {
            const res = await axios.put(url + '/api/subjects/' + classSelection.id,
                {
                    "Name": newChanges.name.toUpperCase().trim(),
                    "ClassCode": newChanges.classCode,
                    "Description": newChanges.description.trim(),
                    "Professor": newChanges.professor.trim(),
                    "Credits": newChanges.credits,
                    "UserId": props.id
                },
                {
                    headers: {
                        'Authorization': 'bearer ' + props.token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            )
            if (res.status === 200) {
                setClassSelection(newChanges)
            }

            setEditMode(false)
            getClasses()
            
            

        } catch (e) {
            console.log(e)
        }
        // axios post to edit
        // reset redux
        // turn off editing mode
    }

    return (
        <div className="subjects">
            <SubjectModal isOpen={openModal} closeModal={closeModal} />           
            <div className="scroller">
                <div className="classHeader">
                    <div className="left">
                        <div className="title">Subjects</div>
                    </div>
                    <div className="right">
                        <button onClick={() => setOpenModal(true)}>+ Add</button>
                    </div>
                </div>
                <div className="listClasses">{props.subjects.map((item) => {
                    return (<div onClick={() => {
                        setEditMode(false)
                        setClassSelection(item)
                        console.log('clicked')
                        console.log(item)
                        console.log(classSelection)
                    }} key={item.id}>
                        <SubjectButton
                            className="button"
                            item={item}
                            setClassSelection={setClassSelection}
                        /></div>
                    )
                })}</div>

            </div>
            <div className="display">
                {!classSelection.id && <p>Please select a class</p>}
                <div className="innerDisplay">
                    { classSelection.id && 
                        <div className="topBar">
                            <div className="left">
                                { !editMode && <h4>{classSelection.name} {classSelection.classCode}</h4> }
                                { editMode && <h4>EDIT</h4>}
                            </div>
                            <div className="right">
                            <button 
                            className="icon"
                            onClick={() => {
                                setEditMode(!editMode)
                                setNewChanges(classSelection)
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
                            Credits: <span>{classSelection.credits}</span> <br/>
                            Professor: <span>{classSelection.professor}</span> <br/>
                            Description: <span>{classSelection.description}</span> <br/>
                            
                        </div>
                    }
                    {( classSelection.id) && editMode && 
                        <div className="mainSection">
                            <form className="edits" onSubmit={submitEdits}>
                                Name: <input 
                                    type="text" 
                                    value={newChanges.name}
                                    onChange={(e) => {
                                        if (true) {
                                            setNewChanges({...newChanges, name: e.target.value.toUpperCase()})
                                        }
                                        }} 
                                    /> <br/>
                                Class Code: <input type="text" value={newChanges.classCode} 
                                onChange={(e) => {
                                    if (!isNaN(e.target.value) && e.target.value < 999) {
                                        setNewChanges({...newChanges, classCode: e.target.value})
                                    }}}
                                /> <br/>
                                Description: <input type="text" value={newChanges.description} 
                                    onChange={(e) => setNewChanges({...newChanges, description: e.target.value})}
                                /> <br/>
                                Prof: <input type="text" value={newChanges.professor} 
                                    onChange={(e) => {
                                        setNewChanges({...newChanges, professor: e.target.value })
                                    }} /> <br />
                                Credits: <input type="text" value={newChanges.credits}
                                    onChange={(e) => {
                                        if (!isNaN(e.target.value) && e.target.value < 10) {
                                            setNewChanges({...newChanges, credits: e.target.value })
                                        }
                                    }} /> 
                                    <br />
                                <button className="button">Submit</button>
                            </form>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.profile.token,
        id: state.profile.id,
        subjects: state.subjects
    }
}

export default connect(mapStateToProps)(SubjectsPage)