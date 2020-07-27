import React, { useState, useEffect, useRef } from "react";
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { connect } from 'react-redux'
import { runningOnThunk, runningOffThunk } from '../thunks/userActivityThunk'
import { postSessionThunk, getSessionsThunk } from '../thunks/sessionsThunk'
import { pausedReduxOn, pausedReduxOff } from '../actions/isRunningActions'
import { IoMdPause, IoMdPlay, IoMdExit, IoMdClose } from 'react-icons/io'
import moment from 'moment'
import swal from 'sweetalert'

const Counter = ({ task, dispatch, id, color, isRunningRedux, paused, setCurrentTask }) => {
    const [count, setCount] = useState(0);
    const [delay, setDelay] = useState(1000);
    const [isRunning, setIsRunning] = useState(false);
    const [interval, setInterval] = useState(15)

    useEffect(() => {
        dispatch(runningOffThunk())
        dispatch(pausedReduxOff())


        return () => {
            setIsRunning(false)
            dispatch(runningOffThunk(task.id))

        }
    }, [])

    useEffect(() => {
        if (isRunning) {

            dispatch(runningOnThunk(task.id))
        }
        else {
            dispatch(runningOffThunk(task.id))
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
            taskId: task.id,
            minutes: interval,
        }))
        dispatch(getSessionsThunk(task.id)).then((currentTask) => {
            setCurrentTask(currentTask)
        }).catch((e) => {
            console.log(e)
        })
        // swal({
        //     title: "Complete!",
        //     text: "Your row has been deleted.",
        //     type: "success",
        //     timer: 1500
        //  });
        //swal("Good job!", "study session complete", "success");
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
                    
                        {(!isRunning && !paused) &&
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
                    <div>
                    {!isRunning &&
                        <button className="but" onClick={startTimer}><IoMdPlay /></button>   
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
        token: state.profile.token,
        id: state.profile.id,
        subjects: state.subjects,
        running: state.running.isRunning,
        paused: state.running.paused
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