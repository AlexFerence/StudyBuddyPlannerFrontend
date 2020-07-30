import React, {useState, useEffect} from 'react'
import TimeInput from './TaskTimeInput'
import Stopwatch from './Stopwatch'
import Select from 'react-select';
import { connect } from 'react-redux'
import Counter from './Timer';
import { getClassColor, getClassName } from '../thunks/subjectThunk';
import {Row, Col } from 'react-bootstrap'
import { setCurrentTaskById } from '../thunks/taskThunk'

const makeTasks = (tasks) => {
    var formattedTasks = []
    tasks.forEach((task) => {
        formattedTasks.push({ value: task, label: task.title })
    })
    return formattedTasks
}

const QuickTimer = ({ dispatch, isRunning, paused, currentTask, tasks }) => {

    const [timerSetting, setTimerSetting] = useState({ value: 'Timer', label: 'Timer' })
    const [localTasks, setLocalTasks] = useState([])
    const [localTask, setLocalTask] = useState({})

    useEffect(() => {
        setLocalTasks(makeTasks(tasks))
    }, [])

    return (
        <div>
        <Row>
        <Col className="pad">
        <Select
                className="pad"
                className="timerSelect"
                value={{...currentTask, label: currentTask.title}}
                onChange={val => {
                    console.log("changed value" + val)

                    dispatch(setCurrentTaskById(val.value.id))
                }}

                placeholder="Task..."
                isDisabled={isRunning || paused}
                options={
                    localTasks
                }
            />
        </Col>
        <Col className="pad">
        
        <Select
                
                className="timerSelect"
                value={timerSetting}
                onChange={val => setTimerSetting(val)}
                placeholder="Type..."
                isDisabled={isRunning || paused}
                options={[
                    { value: 'Timer', label: 'Timer' },
                    { value: 'Stopwatch', label: 'Stopwatch' }
                
                ]}
            />
        </Col>
        </Row>
            
            
            {timerSetting.value === 'Timer' &&
                <Counter
                    //color={getClassColor(currentTask.subjectId)}
                //currentTask={currentTask}

                />}
            {timerSetting.value === 'Stopwatch' &&
                <Stopwatch />
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