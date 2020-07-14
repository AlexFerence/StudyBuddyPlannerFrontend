import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import ChangingProgressProvider from "./ChangingProgressProvider";
import Counter from './Timer'
import 'react-circular-progressbar/dist/styles.css';





const percentage = 66

const minuteSeconds = 60;
const timerProps = {
    size: 250,
    strokeWidth: 6,
    duration: 0
};

const TaskDisplay = ({ task, subjects, turnOnEditing }) => {

    const [seconds, setSeconds] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false)
    const [pomOn, setPomOn] = useState(true)
    const [timerDuration, setTimerDuration] = useState(5)



    return (
        <div className="display-task">
            <div className="display-task-header">
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
                <h5>Add Time:</h5>
                Input Type: <select
                    onChange={(e) => setPomOn(e.target.value)}
                    disabled={isPlaying}>
                    <option value={true}>Pomodoro Timer</option>
                    <option value={true}>Log Time</option>
                </select>
                <span>  --- </span>
                 Minutes: <select
                    hidden={!pomOn}
                    disabled={isPlaying}
                    onChange={(e) => {
                        console.log(typeof (e.target.value))
                        const intDuration = parseInt(e.target.value)
                        console.log(intDuration)
                        console.log(timerDuration)
                    }}
                >
                    <option value={1}>1</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                    <option value="35">35</option>
                    <option value="40">40</option>
                    <option value="45">45</option>
                    <option value="50">50</option>
                    <option value="55">55</option>
                    <option value="60">60</option>
                    <option value="90">90</option>
                    <option value={120}>120</option>
                </select>

                <br />

                <div className="timer">
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


// <ChangingProgressProvider values={[0, 20, 40, 60, 80, 100]}>
//                         {percentage => (
//                             <CircularProgressbar
//                                 value={percentage}
//                                 text={`${percentage * 100}`}
//                                 styles={buildStyles({
//                                     pathTransitionDuration: 0.15,
//                                     strokeLinecap: "butt"
//                                 })}
//                             />
//                         )}
//                     </ChangingProgressProvider>


//<CircularProgressbar
// value={percentage}
// text={`${percentage}`}
// styles={buildStyles({
//     pathTransitionDuration: 0.15,
//     strokeLinecap: "butt"
// })}
// />


