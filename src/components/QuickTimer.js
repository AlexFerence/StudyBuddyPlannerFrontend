import React, { useState, useEffect } from 'react'
import TimeInput from './TaskTimeInput'
import Stopwatch from './Stopwatch'
import Select from 'react-select';
import { connect } from 'react-redux'
import Counter from './Timer';
import { getClassColor, getClassName } from '../thunks/subjectThunk';
import { Row, Col } from 'react-bootstrap'
import { setCurrentTaskById } from '../thunks/taskThunk'
import { realoadClassesThunk } from '../thunks/subjectThunk'
import TaskTimeInput from './TaskTimeInput'


const QuickTimer = ({ dispatch, isRunning, paused, currentTask,
    tasks, subjects, specialFunction }) => {

    const [timerSetting, setTimerSetting] = useState({ value: 'Timer', label: 'Timer' })
    const [localTasks, setLocalTasks] = useState([])
    const [localTask, setLocalTask] = useState({})

    useEffect(() => {
        dispatch(realoadClassesThunk)
        setLocalTasks(makeTasks(tasks))
        if (tasks.length > 0) {
            console.log('setting task')
            setCurrentTaskById(tasks[0].id)
        }
    }, [])

    const getClassName = (subjectId) => {
        const subj = subjects.find((subject) => subject.id === subjectId)
        if (subj) {
            return (subj.name + " " + subj.classCode)
        }
        else {
            return ("no class found")
        }
    }

    const makeTasks = (tasks) => {
        var formattedTasks = []
        tasks.forEach((task) => {
            formattedTasks.push({ value: task, label: getClassName(task.subjectId) + " - " + task.title })
        })
        return formattedTasks
    }

    return (
        <div>
            <Row>
                <Col className="pad">
                    <Select
                        className="pad"
                        className="timerSelect"
                        id="timerSelect"
                        value={{ ...currentTask, label: currentTask.title }}
                        onChange={val => {
                            console.log("changed value" + val)

                            dispatch(setCurrentTaskById(val.value.id))
                        }}
                        placeholder="Task..."
                        isDisabled={isRunning || paused}
                        options={
                            localTasks
                        }
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                text: 'black',
                                primary25: '#bcbcbc',
                                primary50: '#bcbcbc',
                                primary: '#bcbcbc',

                            },
                        })}
                    />
                </Col>
                <Col className="pad">
                    <Select
                        className="timerSelect"
                        id="timerSelect2"
                        value={timerSetting}
                        onChange={val => setTimerSetting(val)}
                        placeholder="Type..."
                        isDisabled={isRunning || paused}
                        options={[
                            { value: 'Timer', label: 'Timer' },
                            { value: 'Stopwatch', label: 'Stopwatch' },
                            { value: 'Time Input', label: 'Time Input' }
                        ]}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                text: 'black',
                                primary25: '#bcbcbc',
                                primary50: '#bcbcbc',
                                primary: '#bcbcbc',

                            },
                        })}
                    />
                </Col>
            </Row>

            {timerSetting.value === 'Timer' &&
                <Counter specialFunction={specialFunction}
                />}
            {timerSetting.value === 'Stopwatch' &&
                <Stopwatch />
            }
            {timerSetting.value === 'Time Input' &&
                <div style={{ padding: '10px' }}>
                    <TaskTimeInput />
                </div>
            }
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        charts: state.charts,
        subjects: state.subjects,
        isRunning: state.running.isRunning,
        paused: state.running.paused,
        currentTask: state.currentTask,
        tasks: state.tasks
    }
}


export default connect(mapStateToProps)(QuickTimer)