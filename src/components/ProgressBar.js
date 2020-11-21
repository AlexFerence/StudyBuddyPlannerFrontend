import React, { Component, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { turnOffProgressBar } from '../thunks/profileThunk';

const ProgressBar = ({ subjects, dispatch, classes, tasks, width, currentMonth = 0 }) => {

    const [show, setShow] = useState(true)

    const renderMessage = () => {
        if (subjects.length === 0) {
            return (
                <span>Add a <Link to='/subjects' id="link">Subject</Link> to complete profile!</span>
            )
        }

        if (tasks.length === 0) {
            return (
                <span>Add a <Link to='/tasks' id="link">Task</Link> to complete profile!</span>
            )
        }
        if (currentMonth === 0) {
            return ('Start a timer to complete profile!')
        }
        else {
            return ('Profile complete!')
        }
    }

    const getProgress = () => {

        if (subjects.length === 0) {
            return 55
        }

        if (tasks.length === 0) {
            return 70
        }
        else if (currentMonth === 0) {
            return 85
        }
        else {
            return 100
        }
    }

    if (tasks.length > 0 && currentMonth > 0) {
        setTimeout(() => {
            setShow(false)
            dispatch(turnOffProgressBar())
        }, 3000);
    }


    if (width < 750) {
        return <div></div>
    }


    return (
        <div className="init-progress-bar">
            { show ?
                <React.Fragment>
                    <div className="init-progress-bar__msg">{renderMessage()}</div>
                    <LinearProgress variant="determinate" value={getProgress()} classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary }} />
                </React.Fragment>
                : <div></div>
            }
        </div>
    )
}



const styles = props => ({
    colorPrimary: {
        backgroundColor: '#dcdcdc',
    },
    barColorPrimary: {
        backgroundColor: '#fb4033',
    }
});

const mapStateToProps = (state) => {
    return {
        subjects: state.subjects,
        width: state.width,
        tasks: state.tasks,
        currentMonth: state.charts.personalStats.currentMonth,
    }
}

export default connect(mapStateToProps)(withStyles(styles)(ProgressBar))