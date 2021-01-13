import React, { useState } from 'react'
import { editSubjectThunk } from '../../../thunks/subjectThunk'
import { setCurrentSubject } from '../../../actions/currentSubjectActions'
import { connect } from 'react-redux'
import EditSubjectHeader from './EditSubjectHeader'
import { Row, Col } from 'react-bootstrap'
import { CirclePicker } from 'react-color'

import Select from 'react-select';

const semestersReduce = (list, semester) => {
    list.push({ value: semester.id, label: semester.title })
    return list
}

const EditSubject = ({ semesters, currentSubject, dispatch, id, setDisplayMode }) => {

    var [newChanges, setNewChanges] = useState({ ...currentSubject })

    const activeSemester = semesters.find((semester) => semester.title === 'Winter 2021')

    const [semester, setSemester] = useState({
        value: activeSemester.id,
        label: activeSemester.title
    })

    const submitEdits = async (e) => {
        e.preventDefault()
        // submit edits
        dispatch(editSubjectThunk({
            Name: newChanges.name.toUpperCase().trim(),
            ClassCode: newChanges.classCode,
            Description: newChanges.description.trim(),
            Professor: newChanges.professor.trim(),
            Credits: newChanges.credits,
            UserId: id,
            color: newChanges.color,

        }, currentSubject))
        // set current subject with new edits
        dispatch(setCurrentSubject(newChanges))
        // turn off editing
        setDisplayMode('display')
    }

    return (
        <div className="innerDisplay">
            <EditSubjectHeader setDisplayMode={setDisplayMode} color={newChanges.color} />
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
                                    if (e.target.value.length < 5) {
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
                                    if (e.target.value.length < 7) {
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
                    <Select
                        value={semester}
                        onChange={val => setSemester(val)}
                        placeholder="Select Term"
                        options={semesters.reduce(semestersReduce, [])}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                text: 'black',
                                primary25: '#bcbcbc',
                                primary50: '#bcbcbc',
                                primary: '#bcbcbc',
                            },
                        })}
                    />
                    <label className="inpLabel">Professor: (optional)</label>
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
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        currentSubject: state.currentSubject,
        id: state.profile.id,
        currentSubject: state.currentSubject,
        semesters: state.profile.semesters
    }
}


export default connect(mapStateToProps)(EditSubject)