import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'
import { connect } from 'react-redux'
import { postSessionThunk } from '../thunks/sessionsThunk'



const TimeInput = ({ color, task, dispatch }) => {
    const [mins, setMins] = useState(0)
    const [hrs, setHrs] = useState(0)
    const [selectedDate, setSelectedDate] = useState(moment())
    const [calendarFocused, setCalendarFocused] = useState(null)

    const onMinsChange = (e) => {
        if (e.target.value < 61 && e.target.value >= 0) {
            setMins(e.target.value)
        }
    }

    const onHrsChange = (e) => {
        if (e.target.value < 5 && e.target.value >= 0) {
            setHrs(e.target.value)
        }
    }

    const submitTime = () => {
        console.log('submitting time ')
        const totalMins = mins + (hrs * 60)
        dispatch(postSessionThunk({
            taskId: task.id,
            minutes: totalMins,
            date: moment(selectedDate).format("YYYY-MM-DD")
        }))
    }

    return (
        <div className="TimeInput">
            <Row className="d-flex align-items-center">
                <Col>
                    <input className="inp" type="number" value={mins} onChange={onMinsChange} />
                </Col>
                <Col>
                    <div className="timeLabel">Min</div>
                </Col>
                <Col>
                    <input className="inp" type="number" value={hrs} onChange={onHrsChange} />
                </Col>
                <Col>
                    <div className="timeLabel">Hrs</div>
                </Col>
            </Row>
            <Row className="d-flex align-items-center">
            <div className="timeLabel">Day</div>
            <SingleDatePicker
                date={selectedDate} // momentPropTypes.momentObj or null
                onDateChange={date => {
                    console.log(date)
                    setSelectedDate(date)
                }} // PropTypes.func.isRequired
                focused={calendarFocused} // PropTypes.bool
                onFocusChange={({ focused }) => setCalendarFocused(focused)} // PropTypes.func.isRequired
                id="your_unique_id" // PropTypes.string.isRequired,
                numberOfMonths={1}
                hideKeyboardShortcutsPanel={true}
                isOutsideRange={() => false}
            />
            </Row>
            
            <Row>
                <Col>
                    <button 
                    className="timeSubmit" 
                    style={{ backgroundColor: color }}
                    onClick={() => submitTime()}
                    >Submit Time</button>
                </Col>
            </Row>
        </div>
    )
}


export default connect()(TimeInput)