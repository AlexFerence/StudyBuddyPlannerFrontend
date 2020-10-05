import React, { useState } from 'react'
import ModalContent from '../../shared/ModalContent'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'
import { createSemesterThunk } from '../../../thunks/semesterThunk'
import { connect } from 'react-redux'
import { ANCHOR_RIGHT } from 'react-dates/constants'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css';
import './react-dates.scss'

const AddSemesterModalContent = ({ closeModal, dispatch }) => {

    const [startDate, setStartDate] = useState(moment('Jan 4, 2021'))
    const [calendarFocused, setCalendarFocused] = useState(false)
    const [endDate, setEndDate] = useState(moment('April 29, 2021'))
    const [calendarFocused2, setCalendarFocused2] = useState(false)

    const [title, setTitle] = useState('Winter 2021')

    const handleCreateSemester = () => {
        console.log('should create semester')
        dispatch(createSemesterThunk({ title, startDate, endDate }))
    }

    return (
        <ModalContent closeModal={closeModal} title="Add Semester">
            <div className="add-semester-modal">
                <div className="inpLabel">Title</div>
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    type="text"
                    className="inp"
                    style={{ minWidth: '300px' }} />
                <div style={{ height: '5px' }} />
                <div>Start Date:</div>
                <div style={{ height: '15px' }} />
                <SingleDatePicker
                    date={startDate} // momentPropTypes.momentObj or null
                    onDateChange={date => {
                        setStartDate(date)
                    }} // PropTypes.func.isRequired
                    focused={calendarFocused} // PropTypes.bool
                    onFocusChange={({ focused }) => setCalendarFocused(focused)} // PropTypes.func.isRequired
                    id="start-date-picker" // PropTypes.string.isRequired,
                    numberOfMonths={1}
                    hideKeyboardShortcutsPanel={true}
                    anchorDirection={ANCHOR_RIGHT}
                />
                <div style={{ height: '20px' }} />
                <div>End Date:</div>
                <div style={{ height: '15px' }} />
                <SingleDatePicker
                    date={endDate} // momentPropTypes.momentObj or null
                    onDateChange={date => {
                        setEndDate(date)
                    }} // PropTypes.func.isRequired
                    focused={calendarFocused2} // PropTypes.bool
                    onFocusChange={({ focused }) => setCalendarFocused2(focused)} // PropTypes.func.isRequired
                    id="end-date-picker" // PropTypes.string.isRequired,
                    numberOfMonths={1}
                    hideKeyboardShortcutsPanel={true}
                    anchorDirection={ANCHOR_RIGHT}
                />
                <div style={{ height: '15px' }} />
                <button className="but"
                    onClick={() => handleCreateSemester()}
                    style={{
                        backgroundColor: '#fb4033',
                        color: 'white',
                        border: 'none',
                        margin: '0px'
                    }}
                >Submit</button>
                <div style={{ height: '10px' }} />
            </div>
        </ModalContent>
    )
}

export default connect()(AddSemesterModalContent)