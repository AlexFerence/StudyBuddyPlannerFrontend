import React from 'react'
import { connect } from 'react-redux'
import { setCurrentSubject } from '../../../actions/currentSubjectActions'
import SemesterDropdown from './SemesterDropdown'

const ListSubjects = ({ subjects, setDisplayMode, dispatch, semesters = [] }) => {
    const handleSelectedSubject = (id) => {
        setDisplayMode('display')
        const selectedSubject = subjects.find((subject) => subject.id === id)
        if (selectedSubject) {
            dispatch(setCurrentSubject(selectedSubject))
        }
    }
    const handleOpenAddModal = () => {
        setDisplayMode('adding')
    }

    return (
        <div>
            <div className="classHeader">
                <div className="left">
                    <div className="title">Subjects</div>
                </div>
                <div className="right">
                    <button id="addButton" onClick={() => handleOpenAddModal()}>+ Add Subject</button>
                </div>
            </div>
            <div>
                {
                    // map over the semesters
                    semesters && semesters.map((sem) => {
                        return (
                            <SemesterDropdown sem={sem} key={sem.id}
                                handleSelectedSubject={handleSelectedSubject} />
                        )
                    })
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        subjects: state.subjects,
        semesters: state.profile.semesters
    }
}

export default connect(mapStateToProps)(ListSubjects)