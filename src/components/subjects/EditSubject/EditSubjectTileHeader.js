import React from 'react'
import { connect } from 'react-redux'
import { IoMdClose } from 'react-icons/io'

const SubjectDisplay = ({ currentSubject, setDisplayMode, color, turnOffEditing }) => {
    const handleTurnOffEditing = () => {
        console.log('go back')
        turnOffEditing()
    }

    return (
        <div className="topBar" style={{ backgroundColor: color }}>
            <div className="idTitle">Edit</div>
            <button
                className="icon"
                id="edit-hover"
                onClick={() => handleTurnOffEditing()}
            ><IoMdClose /></button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        currentSubject: state.currentSubject
    }
}

export default connect(mapStateToProps)(SubjectDisplay)