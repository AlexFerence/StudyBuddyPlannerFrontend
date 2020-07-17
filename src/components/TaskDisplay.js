import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Counter from './Timer'
import 'react-circular-progressbar/dist/styles.css';


const percentage = 66
const minuteSeconds = 60;
const timerProps = {
    size: 250,
    strokeWidth: 6,
    duration: 0
};

const TaskDisplay = ({ task, subjects, turnOnEditing, getClassColor }) => {

    const [seconds, setSeconds] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false)
    const [pomOn, setPomOn] = useState(true)
    const [timerDuration, setTimerDuration] = useState(5)



    return (
        <div className="display-task">
            <div className="display-task-header" style={{ backgroundColor: getClassColor(task.subjectId)}}>
                <span>{task.title}</span>
                <div>
                    <button
                        className="edit"
                        onClick={() => {
                            turnOnEditing()
                        }}
                    >Edit</button>
                </div>
            </div>
            <div className="display-task-body">
                <div className="">
                    <Counter />
                </div>
                <div>
                    <p>- {task.description}</p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        subjects: state.subjects
    }
}


export default connect(mapStateToProps)(TaskDisplay)