import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';
import { connect } from 'react-redux';

const ProgressBar = ({ classes, width }) => {

    const renderMessage = () => {
    }

    if (width < 750) {
        return <div></div>
    }

    return (
        <div className="init-progress-bar">
            <div style={{ marginBottom: '8px' }}>Add a Task to Complete Profile!</div>
            <LinearProgress variant="determinate" value={60} classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary }} />
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
        width: state.width
    }
}

export default connect(mapStateToProps)(withStyles(styles)(ProgressBar))