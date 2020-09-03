import React, { useState, useEffect, useRef } from "react";
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { connect } from 'react-redux'
import { runningOnThunk, runningOffThunk } from '../thunks/userActivityThunk'
import { postSessionThunk, getSessionsThunk } from '../thunks/sessionsThunk'
import { pausedReduxOn, pausedReduxOff } from '../actions/isRunningActions'
import { IoMdPause, IoMdPlay, IoMdExit, IoMdClose } from 'react-icons/io'
import moment from 'moment'
import swal from 'sweetalert'
import { setCurrentTaskById, loadTasks } from '../thunks/taskThunk'
import {
    loadChartsThunk, loadSubjectBreakdown, loadHoursWeek,
    loadMarksScatter,
    loadTaskHoursPerWeek,
    loadPersonalStats
} from '../thunks/chartThunk'
import { Link } from 'react-router-dom'

const Counter = ({ subjects, tasks, currentTask, dispatch, id, color, isRunningRedux, paused, setCurrentTask, specialFunction }) => {
    const [count, setCount] = useState(0);
    const [delay, setDelay] = useState(1000);
    const [isRunning, setIsRunning] = useState(false);
    const [interval, setInterval] = useState(15 * 60)

    useEffect(() => {
        dispatch(runningOffThunk())
        dispatch(pausedReduxOff())

        return () => {
            setIsRunning(false)
            dispatch(runningOffThunk(currentTask.id))
        }
    }, [])

    const getStatement = () => {
        if (subjects.length === 0) {
            return (
                <div>First add a <Link to="/subjects" style={{ color: "#fb4033" }}>Subject</Link></div>
            )
        }
        else if (tasks.length === 0) {
            return (
                <div>First add a <Link to="/tasks" style={{ color: "#fb4033" }}>Task</Link></div>
            )
        }
        else {
            return (
                <div>Please select a task above</div>
            )
        }
    }

    useInterval(() => {
        setCount(count + 1);
        if (percent >= 1) { setIsRunning(false) }
        if (percent === 1) { timerDone() }
    }, isRunning ? delay : null);

    const startTimer = () => {
        if (interval > 0) {
            setIsRunning(true)
            //turn on is running locally
            dispatch(runningOnThunk(currentTask.id))
            dispatch(pausedReduxOff())
            if (specialFunction) {
                dispatch(specialFunction())
            }
        }
    }

    const pauseTimer = () => {
        setIsRunning(false)
        dispatch(pausedReduxOn())
        dispatch(runningOffThunk(currentTask.id))
        if (specialFunction) {
            dispatch(specialFunction())
        }
    }

    const timerDone = async () => {
        resetCount()
        dispatch(runningOffThunk(currentTask.id))
        dispatch(pausedReduxOff())
        await dispatch(postSessionThunk({
            taskId: currentTask.id,
            minutes: Math.floor(interval / 60),
        }))
        await dispatch(loadTasks())

        //TODO put in new call

        dispatch(loadChartsThunk())
        dispatch(loadSubjectBreakdown())
        dispatch(loadHoursWeek())
        dispatch(loadMarksScatter())
        dispatch(loadTaskHoursPerWeek())
        dispatch(loadPersonalStats())
        dispatch(setCurrentTaskById(currentTask.id))

        if (specialFunction) {
            dispatch(specialFunction())
        }

    }

    var percent = count / interval

    const resetCount = () => {
        if (paused) {
            swal({
                title: "Are you sure you want to Give Up?",
                text: "All progress for the study session will be lost",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        setCount(0)
                        setIsRunning(false)
                        dispatch(pausedReduxOff())
                    } else {

                    }
                });
        }
        else {
            setCount(0)
            setIsRunning(false)
            dispatch(pausedReduxOff())
        }


    }

    const timeChanged = (e) => {
        if (e.target.value >= 0 && !isNaN(e.target.value)) {
            setInterval(parseInt(e.target.value) * 60)
        }
    }



    return (
        <div>
            <div className="timer">
                <CircularProgressbarWithChildren
                    value={percent * 100}
                    //text={(interval - count) > 0 ? timeDisplay(interval - count) : "0"}
                    styles={buildStyles({
                        pathTransitionDuration: 0.15,
                        strokeLinecap: "butt",
                        pathColor: currentTask.color,
                    })}
                >
                    {false &&
                        <div>
                            First add a <Link style={{ color: "#fb4033" }}>Subject</Link>
                        </div>
                    }
                    {
                        !currentTask.id > 0 ?
                            (<div style={{ textAlign: 'center' }}>
                                {getStatement()}</div>) :
                            (!isRunning && !paused) &&
                            <div className="inside d-flex justify-content-center align-items-center">
                                <input className="inp" type="number"
                                    value={Math.floor(interval / 60)}
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

                    <div>
                        {!isRunning &&
                            <button disabled={!currentTask.id} className="but" onClick={startTimer}><IoMdPlay /></button>
                        }
                        {!isRunning && paused &&
                            <button className="but" onClick={resetCount}><IoMdClose /></button>

                        }
                    </div>
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
        subjects: state.subjects,
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
    } if (mins < 10 && hours > 0) {
        mins = "0" + mins
    } if (n < 60) {
        return (`${n}`)
    } else if (n >= 3600) {
        return (`${hours}:${mins}:${seconds}`)
    } else if (n >= 60) {
        return (`${mins}:${seconds}`)
    } else {
        return (`${seconds}`)
    }
}

export default connect(mapStateToProps)(Counter)