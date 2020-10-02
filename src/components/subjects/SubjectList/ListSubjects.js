import React from 'react'
import { connect } from 'react-redux'
import SubjectButton from './SubjectButton'

const ListSubjects = ({ subjects, setOpenModal, setEditMode, dispatch }) => {

    const handleSelectedSubject = () => {

    }

    return (
        <div>
            <div className="classHeader">
                <div className="left">
                    <div className="title">Subjects</div>
                </div>
                <div className="right">
                    <button id="addButton" onClick={() => setOpenModal(true)}>+ Add Subject</button>
                </div>
            </div>
            <div className="listClasses">{subjects.map((item) => {
                return (
                    <div onClick={handleSelectedSubject} key={item.id}>
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