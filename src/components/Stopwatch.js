import React, { useState, useEffect, useRef } from "react";
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { connect } from 'react-redux'
import { runningOnThunk, runningOffThunk } from '../thunks/userActivityThunk'
import { postSessionThunk, getSessionsThunk } from '../thunks/sessionsThunk'
import { pausedReduxOn, pausedReduxOff } from '../actions/isRunningActions'
import { IoMdPause, IoMdPlay, IoMdExit, IoMdClose } from 'react-icons/io'
import swal from 'sweetalert'
import { setCurrentTaskById, loadTasks } from '../thunks/taskThunk'

const Stopwatch = ({ currentTask, dispatch, id, color, isRunningRedux, paused, setCurrentTask }) => {
    const [count, setCount] = useState(0);
    const [delay, setDelay] = useState(1000);
    const [isRunning, setIsRunning] = useState(false);
    const [interval, setInterval] = useState(100000)

    useEffect(() => {
        dispatch(runningOffThunk())
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

    const timerDone = async () => {
        console.log('done')
        
        dispatch(pausedReduxOff())
        dispatch(postSessionThunk({
            taskId: currentTask.id,
            minutes: interval,
        }))
        // dispatch(getSessionsThunk(currentTask.id)).then((currentT) => {
        //     setCurrentTask(currentT)
        // }).catch((e) => {
        //     console.log(e)
        // })

        await dispatch(loadTasks())
            
        dispatch(setCurrentTaskById(currentTask.id))
        
        resetCount()
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
            setInterval(parseInt(e.target.value))
        }
    }

    const submitTime = async () => {
        if (count > 1) {
            dispatch(postSessionThunk({
                taskId: currentTask.id,
                minutes: parseInt(count),
            }))
            await dispatch(loadTasks()) 
            dispatch(setCurrentTaskById(currentTask.id))
        }
        resetCount()
    }
    
    return (
        <div>
            <div className="stopwatch">
                <div className="inside d-flex justify-content-center align-items-center">
                    <span className="stopDisplay">{timeDisplay(count)}</span>
                </div>
                <div className="inside d-flex justify-content-center align-items-center">
                    {!isRunning && <button className="but" onClick={startTimer}><IoMdPlay /></button>}
                    {isRunning && <button className="but" onClick={submitTime}>Done</button>}

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
        return(`${n}`)
    } else if (n >= 3600) {
        return(`${hours}:${mins}:${seconds}`)
    } else if (n >= 60) {
        return(`${mins}:${seconds}`)
    } else {
        return(`${seconds}`)
    }
}

export default connect(mapStateToProps)(Stopwatch)