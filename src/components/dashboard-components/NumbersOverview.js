import React from 'react'
import { connect } from 'react-redux'

const NumbersOverView = ({ charts }) => {

    const hoursToTimeDisplay = (h) => {
        const hours = Math.floor(h / 60)
        const mins = Math.floor(m % 60)

        return (hours + 'hrs., ' + mins + 'min.')
    }

    return (
        <div className="innerBoxCol">
            <div className="flexNumDisplay" >
                <div className="rowTitle">Current Stats</div>
                <div className="row">
                    <div className="square">
                        <div className="squareTitle">Today</div>
                        <div className="squareData">{hoursToTimeDisplay(charts.personalStats.currentDay)}</div>
                    </div>
                    <div className="square">
                        <div className="squareTitle">Past Week</div>
                        <div className="squareData">{hoursToTimeDisplay(charts.personalStats.currentWeek)}</div>
                    </div>
                    <div className="square">
                        <div className="squareTitle">Past Month</div>
                        <div className="squareData">{hoursToTimeDisplay(charts.personalStats.currentMonth)}</div>
                    </div>
                </div>
                <div className="rowTitle">Average Result</div>
                <div className="row">
                    <div className="square">
                        <div className="squareTitle">Day</div>
                        <div className="squareData">{hoursToTimeDisplay(charts.personalStats.averageDay)}</div>
                    </div>
                    <div className="square">
                        <div className="squareTitle">Week</div>
                        <div className="squareData">{hoursToTimeDisplay(charts.personalStats.averageWeek)}</div>
                    </div>
                    <div className="square">
                        <div className="squareTitle">Month</div>
                        <div className="squareData">{hoursToTimeDisplay(charts.personalStats.averageMonth)}</div>
                    </div>
                </div>
                <div className="rowTitle">Best Result</div>
                <div className="row">
                    <div className="square">
                        <div className="squareTitle">Day</div>
                        <div className="squareData">{hoursToTimeDisplay(charts.personalStats.bestDay)}</div>
                    </div>
                    <div className="square">
                        <div className="squareTitle">Week</div>
                        <div className="squareData">{hoursToTimeDisplay(charts.personalStats.bestWeek)}</div>
                    </div>
                    <div className="square">
                        <div className="squareTitle">Month</div>
                        <div className="squareData">{hoursToTimeDisplay(charts.personalStats.bestMonth)}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        charts: state.charts,
        profile: state.profile,
        subjects: state.subjects,
        stripeStatus: state.profile.userBilling.stripeStatus,
        tasks: state.tasks,
        width: state.width
    }
}

export default connect(mapStateToProps)(NumbersOverView)