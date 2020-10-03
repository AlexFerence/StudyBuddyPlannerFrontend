import React from 'react'
import { connect } from 'react-redux'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import swal from 'sweetalert'

const SubjectDisplay = ({ currentSubject, turnOnEditing }) => {
    const handleTurnOnEditing = () => {
        turnOnEditing()
    }

    const handleDeleteSubject = () => {
        swal({
            title: "Can't delete subjects right now",
            text: "Feature will be updated at the end of the term",
            icon: "warning",
            dangerMode: true,
        })
    }

    return (
        <div className="topBar" style={{ backgroundColor: currentSubject.color }} >
            <div className="idTitle">{currentSubject.name} {currentSubject.classCode}</div>
            <div>
                <button
                    className="icon"
                    id="edit-hover"
                    onClick={() => handleTurnOnEditing()}
                ><FaEdit /></button>
                <button
                    className="icon"
                    id="trash"
                    onClick={() => handleDeleteSubject()}
                ><FaTrashAlt /></button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        currentSubject: state.currentSubject
    }
}

export default connect(mapStateToProps)(SubjectDisplay)