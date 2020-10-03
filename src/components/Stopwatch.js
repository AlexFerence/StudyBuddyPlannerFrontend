import React, { useState, useEffect, useRef } from "react";
import { connect } from 'react-redux'
import { runningOnThunk, runningOffThunk } from '../thunks/userActivityThunk'
import { postSessionThunk } from '../thunks/sessionsThunk'
import { pausedReduxOn, pausedReduxOff } from '../actions/isRunningActions'
import { IoMdPlay, IoMdPause, IoMdCheckmark } from 'react-icons/io'
import swal from 'sweetalert'
import { setCurrentTaskById, loadTasks } from '../thunks/taskThunk'
import { loadFiveCharts } from '../thunks/chartThunk'
import * as workerTimers from 'worker-timers';

const Stopwatch = ({ currentTask, dispatch, id, color, isRunningRedux, paused, setCurrentTask }) => {
    const [count, setCount] = useState(0);
    const [delay, setDelay] = useState(1000);
    const [isRunning, setIsRunning] = useState(false);
    const [interval, setInterval] = useState(100000)

    useEffect(() => {
        dispatch(runningOffThunk(currentTask.id))
        dispatch(pausedReduxOff())

        return () => {
            setIsRunning(false)
            dispatch(runningOffThunk(currentTask.id))
            submitTime()
        }
    }, [])

    useEffect(() => {
        if (isRunning) {
            dispatch(runningOnThunk(currentTask.id))
        }
        else {
            dispatch(runningOffThunk(currentTask.id))
        }
    }, [isRunning])

    //interval for timer to tick
    useInterval(() => {
        setCount(count + 1);
        if (percent >= 1) { setIsRunning(false) }
        if (percent === 1) { timerDone() }
    }, isRunning ? delay : null);

    const startTimer = () => {
        if (interval > 0) {
            setIsRunning(true)
            dispatch(pausedReduxOff())
        }
    }

    const pauseTimer = () => {
        setIsRunning(false)
        dispatch(pausedReduxOn())
    }

    const timerDone = () => {
        console.log()
        swal({
            title: "Study session recorded",
            icon: "success",
            buttons: true,
        })

        dispatch(pausedReduxOff())
        dispatch(postSessionThunk({
            taskId: currentTask.id,
            minutes: interval,
        }))

        dispatch(loadFiveCharts())

        dispatch(setCurrentTaskById(currentTask.id))

        resetCount()
    }

    var percent = count / interval

    const resetCount = () => {

        setCount(0)
        setIsRunning(false)
        dispatch(pausedReduxOff())

    }



    const submitTime = async () => {
        if (count > 1) {

            swal({
                title: "Study session recorded",
                icon: "success",
                buttons: true,
            })

            await dispatch(postSessionThunk({
                taskId: currentTask.id,
                minutes: Math.floor(parseInt(count) / 60),
            }))

            // refresh all dashboard charts
            dispatch(loadFiveCharts())

            // so task sessions instantly update
            await dispatch(loadTasks())
            dispatch(setCurrentTaskById(currentTask.id))

        }
        resetCount()
    }

    return (
        <div>
            <div className="stopwatch">
                <div className="inside d-flex justify-content-center align-items-center">
                    <div id="stopDisplay" >{timeDisplay(count)}</div>
                </div>
                <div
                    className="inside d-flex justify-content-center align-items-center">
                    {!isRunning &&
                        <div>
                            <div style={{ minWidth: '120px' }}>
                                <button
                                    disabled={!currentTask.id}
                                    className="but noHover"
                                    onClick={startTimer}
                                ><IoMdPlay /></button>
                                {count > 1 && <button
                                    className="but noHover"
                                    onClick={submitTime}
                                ><IoMdCheckmark /></button>}
                            </div>
                        </div>

                    }
                    {isRunning &&
                        <div>
                            <div style={{ minWidth: '120px' }}>
                                <button
                                    className="but noHover"
                                    onClick={pauseTimer}
                                >
                                    <IoMdPause />
                                </button>
                                <button
                                    className="but noHover"
                                    onClick={submitTime}
                                ><IoMdCheckmark /></button>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
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
            let id = workerTimers.setInterval(tick, delay);
            return () => workerTimers.clearInterval(id);
        }
    }, [delay]);
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        token: state.profile.token,
        id: state.profile.id,
        subjects: state.subjects,
        running: state.running.isRunning,
        paused: state.running.paused,
        currentTask: state.currentTask
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
    }
    if (hours < 10) {
        hours = "0" + hours
    }
    return (`${hours}:${mins}:${seconds}`)
}

export default connect(mapStateToProps)(Stopwatch)