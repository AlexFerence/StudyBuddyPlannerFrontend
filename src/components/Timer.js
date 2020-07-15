import React, { useState, useEffect, useRef } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

function Counter() {
    const [count, setCount] = useState(0);
    const [delay, setDelay] = useState(1000);
    const [isRunning, setIsRunning] = useState(false);
    const [interval, setInterval] = useState(15)

    useInterval(() => {
        // Your custom logic here
        setCount(count + 1);
        console.log(interval)

        if (percent >= 1) {
            setIsRunning(false)
        }

    }, isRunning ? delay : null);

    var percent = count / interval

    const resetCount = () => {
        setCount(0)
        setIsRunning(false)
    }

    const startTimer = () => {
        setIsRunning(true)
    }

    function handleIsRunningChange(e) {
        setIsRunning(e.target.checked);
    }

    return (
        <div>
            <select disabled={isRunning} onChange={(e) => {
                setInterval(parseInt(e.target.value))
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

            { false && <input type="checkbox" checked={isRunning} onChange={handleIsRunningChange} />}
            <div className="timer">
                <CircularProgressbar
                    value={percent * 100}
                    text={`${(interval - count) > 0 ? interval - count : 0}`}
                    styles={buildStyles({
                        pathTransitionDuration: 0.15,
                        strokeLinecap: "butt"
                    })}
                />
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

export default Counter