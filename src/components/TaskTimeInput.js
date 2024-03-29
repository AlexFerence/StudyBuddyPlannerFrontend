import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import moment from 'moment'

import { connect } from 'react-redux'
import { postSessionThunk, getSessionsThunk } from '../thunks/sessionsThunk'
import swal from 'sweetalert'
import { setCurrentTaskById, loadTasks } from '../thunks/taskThunk'
import { ANCHOR_RIGHT } from 'react-dates/constants'
import { loadFiveCharts } from '../thunks/chartThunk'
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css';


const TimeInput = ({ color, dispatch, currentTask }) => {
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

    const submitTime = async () => {
        console.log('submitting time ')
        const totalMins = ((parseInt(hrs) * 60) + parseInt(mins))
        if (totalMins > 0) {
            setMins(0)
            setHrs(0)
            await dispatch(postSessionThunk({
                taskId: currentTask.id,
                minutes: totalMins,
                date: moment(selectedDate).format("YYYY-MM-DD"),
            }))

            await dispatch(loadTasks())

            dispatch(setCurrentTaskById(currentTask.id))

            //PUT SWAL HERE
            swal({
                title: "Study session recorded",
                icon: "success",
                buttons: true,
            })
            // dispatch(getSessionsThunk(currentTask.id))

            // update charts here
            dispatch(loadFiveCharts())

            await dispatch(loadTasks())
            dispatch(setCurrentTaskById(currentTask.id))
        }
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
            <div style={{ height: '5px' }} />
            <Row className="d-flex align-items-center" style={{ zIndex: '200' }}>
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
                    isOutsideRange={day => (moment().diff(day) < 0)}
                    anchorDirection={ANCHOR_RIGHT}
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
            </Row>
            <div style={{ height: '5px' }} />
            <Row>
                <Col>
                    <button
                        className="timeSubmit"
                        style={{ backgroundColor: currentTask?.color || '#FFFFFF' }}
                        onClick={() => submitTime()}
                    >Submit Time</button>
                </Col>
            </Row>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        currentTask: state.currentTask
    }
}



export default connect(mapStateToProps)(TimeInput)