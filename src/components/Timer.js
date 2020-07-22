import React, { useState, useEffect, useRef } from "react";
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';

import { connect } from 'react-redux'
import { runningOnThunk, runningOffThunk } from '../thunks/userActivityThunk'
import { postSessionThunk } from '../thunks/sessionsThunk'
import { pausedReduxOn, pausedReduxOff } from '../actions/isRunningActions'
import { IoMdPause } from 'react-icons/io'

const Counter = ({ task, dispatch, id, color }) => {
    const [count, setCount] = useState(0);
    const [delay, setDelay] = useState(1000);
    const [isRunning, setIsRunning] = useState(false);
    const [paused, setPaused] = useState(false);
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
        dispatch(pausedReduxOff())
    }

    const pauseTimer = () => {
        setIsRunning(false)
        dispatch(runningOffThunk(task.id))
        setPaused(true)
        dispatch(pausedReduxOn())
    }

    const timerDone = () => {
        console.log('done')
        resetCount()
        dispatch(runningOffThunk(task.id))
        dispatch(pausedReduxOff())
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

    const timeChanged = (e) => {
        if (e.target.value >= 0 && !isNaN(e.target.value)) {
            setInterval(parseInt(e.target.value))
        }
    }

    useEffect(() => {
        dispatch(runningOffThunk())
        dispatch(pausedReduxOff())

        return () => {
            setIsRunning(true)
            dispatch(runningOffThunk(task.id))

        }
    }, [])

    return (
        <div>
            <div className="timer">
                <CircularProgressbarWithChildren
                    value={percent * 100}
                    //text={(interval - count) > 0 ? timeDisplay(interval - count) : "0"}
                    styles={buildStyles({
                        pathTransitionDuration: 0.15,
                        strokeLinecap: "butt",
                        pathColor: color,
                    })}
                >
                    
                        {!isRunning && !paused &&
                            <div className="inside d-flex justify-content-center align-items-center">
                            <input className="inp" type="number"
                            value={interval}
                            onChange={timeChanged}
                            />
                            <div className="minlab">min</div>
                            </div>
                        }
                        {(isRunning || paused) &&
                        <div className="inside d-flex justify-content-center align-items-center">
                            <span className="timeDisplay">{timeDisplay(interval - count)}</span>
                        </div>


                    }
                    {!isRunning && <button className="but" onClick={startTimer}>Start</button>}
                    {isRunning && <button className="but" onClick={pauseTimer}><IoMdPause /></button>}



                </CircularProgressbarWithChildren>
            </div>

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
    } if (mins < 10 && hours > 0) {
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