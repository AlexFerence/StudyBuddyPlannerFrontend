import React, { useState, useEffect, useRef } from "react";
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';

import { connect } from 'react-redux'
import { runningOnThunk, runningOffThunk } from '../thunks/userActivityThunk'
import { postSessionThunk } from '../thunks/sessionsThunk'

const Counter = ({ task, dispatch, id }) => {
    const [count, setCount] = useState(0);
    const [delay, setDelay] = useState(1000);
    const [isRunning, setIsRunning] = useState(false);
    const [interval, setInterval] = useState(15)

    //interval for timer to tick
    useInterval(() => {
        setCount(count + 1);
        if (percent >= 1) { setIsRunning(false) }
        if (percent === 1) { timerDone() }
    }, isRunning ? delay : null);

    const startTimer = () => {
        setIsRunning(true)
        dispatch(runningOnThunk(task.id))
    }

    const timerDone = () => {
        console.log('done')
        resetCount()
        dispatch(runningOffThunk(task.id))
        dispatch(postSessionThunk({ 
            taskId: task.id, 
            minutes: interval,
        }))
    }

    var percent = count / interval

    const resetCount = () => {
        setCount(0)
        setIsRunning(false)
    }

    

    // function handleIsRunningChange(e) {
    //     setIsRunning(e.target.checked);
    // }

    return (
        <div>
            <select disabled={isRunning} onChange={(e) => {
                setInterval(parseInt(e.target.value) * 60)
            }}>
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
                <option value="120">120</option>
            </select>
            <div className="timer">
                <CircularProgressbarWithChildren
                    value={percent * 100}
                    //text={(interval - count) > 0 ? timeDisplay(interval - count) : "0"}
                    styles={buildStyles({
                        pathTransitionDuration: 0.15,
                        strokeLinecap: "butt",
                        textColor: "black",
                    })}
                >
                <div>
                <input className="inp" type="number"></input>  
                </div>
                </CircularProgressbarWithChildren>
            </div>
            <button onClick={resetCount}>Reset</button>
            <button onClick={startTimer}>Start</button>

        </div>
    );
}

function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        token: state.profile.token,
        id: state.profile.id,
        subjects: state.subjects
    }
}



const timeDisplay = (n) => {
    var hours = Math.floor(n / 3600)
    var mins = Math.floor((n - (hours * 3600)) / 60)
    var seconds = n % 60
    if (seconds < 10) {
        seconds = "0" + seconds 
    } if (mins < 10) {
        mins = "0" + mins
    } if (n < 60) {
        return(`${n}`)
    } else if (n >= 3600) {
        return(`${hours}:${mins}:${seconds}`)
    } else if (n >= 60) {
        return(`${mins}:${seconds}`)
    } else {
        return(`${seconds}`)
    }
}

export default connect(mapStateToProps)(Counter)