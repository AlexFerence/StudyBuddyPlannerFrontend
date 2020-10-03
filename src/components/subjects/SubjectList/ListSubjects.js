import React from 'react'
import { connect } from 'react-redux'
import SubjectButton from './SubjectButton'
import { setCurrentSubject } from '../../../actions/currentSubjectActions'

const ListSubjects = ({ subjects, setDisplayMode, dispatch }) => {

    const handleSelectedSubject = (id) => {
        setDisplayMode('display')
        const selectedSubject = subjects.find((subject) => subject.id === id)
        if (selectedSubject) {
            dispatch(setCurrentSubject(selectedSubject))
        }
    }

    const handleOpenAddModal = () => {
        console.log('adding')
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
            <div className="listClasses">{subjects.map((item) => {
                return (
                    <div onClick={() => handleSelectedSubject(item.id)} key={item.id}>
                        <SubjectButton item={item} />
                    </div>
                )
            })}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        subjects: state.subjects
    }
}

export default connect(mapStateToProps)(ListSubjects)