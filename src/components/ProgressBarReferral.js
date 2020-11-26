import React, { Component, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { turnOffProgressBar } from '../thunks/profileThunk';

const ProgressBar = ({ subjects, dispatch, classes, tasks, width, currentMonth = 0, referredUsers = [] }) => {

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
        const numActiveUsers = referredUsers.filter((user) => user.active === 'Active')

        if (numActiveUsers.length >= 5) {
            return 100
        }
        return numActiveUsers.length * 20
    }


    if (width < 750) {
        return <div></div>
    }


    return (
        <div className="init-progress-bar">
            { show ?
                <React.Fragment>
                    {false && <div className="init-progress-bar__msg">{renderMessage()}</div>}
                    <div style={{ color: 'grey' }} className="init-progress-bar__msg">Refer 5 active friends to unlock StudyBuddy Premium!</div>
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
        referredUsers: state.settings.referredUsers
    }
}

export default connect(mapStateToProps)(withStyles(styles)(ProgressBar))