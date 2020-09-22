import React from 'react'
import { connect } from 'react-redux'

const NumbersOverView = ({ charts }) => {

    const hoursToTimeDisplay = (h) => {
        var hours = Math.floor(h)
        var decimalMins = (h - hours) * 60
        var returnMins = Math.floor(decimalMins)
        if (decimalMins < 10) {
            returnMins = "0" + returnMins
        }
        return (hours + 'hrs., ' + returnMins + 'min.')
    }

    return (
        <div className="innerBoxCol">
            <div className="flexNumDisplay" >
                <div className="rowTitle">Current Stats</div>
                <div className="row">
                    <div className="square">
                        <div className="squareTitle">Today</div>
                        <div className="squareData">{hoursToTimeDisplay(charts.personalStats.CurrentDay)}</div>
                    </div>
                    <div className="square">
                        <div className="squareTitle">Past Week</div>
                        <div className="squareData">{hoursToTimeDisplay(charts.personalStats.CurrentWeek)}</div>
                    </div>
                    <div className="square">
                        <div className="squareTitle">Past Month</div>
                        <div className="squareData">{hoursToTimeDisplay(charts.personalStats.CurrentMonth)}</div>
                    </div>
                </div>
                <div className="rowTitle">Average Result</div>
                <div className="row">
                    <div className="square">
                        <div className="squareTitle">Day</div>
                        <div className="squareData">{hoursToTimeDisplay(charts.personalStats.AverageDay)}</div>
                    </div>
                    <div className="square">
                        <div className="squareTitle">Week</div>
                        <div className="squareData">{hoursToTimeDisplay(charts.personalStats.AverageWeek)}</div>
                    </div>
                    <div className="square">
                        <div className="squareTitle">Month</div>
                        <div className="squareData">{hoursToTimeDisplay(charts.personalStats.AverageMonth)}</div>
                    </div>
                </div>
                <div className="rowTitle">Best Result</div>
                <div className="row">
                    <div className="square">
                        <div className="squareTitle">Day</div>
                        <div className="squareData">{hoursToTimeDisplay(charts.personalStats.BestDay)}</div>
                    </div>
                    <div className="square">
                        <div className="squareTitle">Week</div>
                        <div className="squareData">{hoursToTimeDisplay(charts.personalStats.BestWeek)}</div>
                    </div>
                    <div className="square">
                        <div className="squareTitle">Month</div>
                        <div className="squareData">{hoursToTimeDisplay(charts.personalStats.BestMonth)}</div>
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