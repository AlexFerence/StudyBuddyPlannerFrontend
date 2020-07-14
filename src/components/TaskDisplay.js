import React, { useState } from 'react'
import { connect } from 'react-redux'
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const minuteSeconds = 60;
const timerProps = {
    size: 250,
    strokeWidth: 6,
    duration: 0
};

const TaskDisplay = ({ task, subjects, turnOnEditing }) => {

    const [isPlaying, setIsPlaying] = useState(false)
    const [pomOn, setPomOn] = useState(true)

    const startTime = Date.now() / 1000; // use UNIX timestamp in seconds
    const endTime = startTime + 2432401; // use UNIX timestamp in seconds

    const remainingTime = endTime - startTime;

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
                 disabled={isPlaying}>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                    <option value={30}>30</option>
                    <option value={35}>35</option>
                    <option value={40}>40</option>
                    <option value={45}>45</option>
                    <option value={50}>50</option>
                    <option value={55}>55</option>
                    <option value={60}>60</option>
                    <option value={90}>90</option>
                    <option value={120}>120</option>
                </select>  
                
                <br />

                <div className="timer">
                    <CountdownCircleTimer
                        {...timerProps}
                        colors={[["#A30000"]]}
                        duration={minuteSeconds}
                        isPlaying={isPlaying}
                        initialRemainingTime={60}
                        onComplete={() => {
                            //totalElapsedTime => [remainingTime - totalElapsedTime > 0]
                            console.log('finished')

                        }}
                    >
                        {
                            ({ elapsedTime }) => <h3>{parseInt(elapsedTime)}</h3>
                        }
                    </CountdownCircleTimer>
                    
                </div>
                <div>
                {
                    isPlaying ?
                    <button onClick={() => setIsPlaying(!isPlaying)}>
                        Pause
                    </button>
                    :
                    <button onClick={() => setIsPlaying(!isPlaying)}>
                        Start
                    </button>
                }
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

