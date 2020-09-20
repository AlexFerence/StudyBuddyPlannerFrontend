import React from 'react'
import { connect } from 'react-redux'

const NumbersOverView = ({ charts }) => {
    return (
        <div className="innerBoxCol">
            <div className="flexNumDisplay" >
                <div className="rowTitle">Current Stats</div>
                <div className="row">
                    <div className="square">
                        <div className="squareTitle">Today</div>
                        <div className="squareData">{charts.todayTotal && true ? charts.todayTotal.hours : 0}hrs., {charts.todayTotal && true ? charts.todayTotal.mins : 0}min.</div>
                    </div>
                    <div className="square">
                        <div className="squareTitle">Past Week</div>
                        <div className="squareData">{charts.thisWeekTotal && true ? charts.thisWeekTotal.hours : 0}hrs., {charts.thisWeekTotal && true ? charts.thisWeekTotal.mins : 0}min.</div>
                    </div>
                    <div className="square">
                        <div className="squareTitle">Past Month</div>
                        <div className="squareData">{charts.thisMonthTotal && true ? charts.thisMonthTotal.hours : 0}hrs., {charts.thisMonthTotal && true ? charts.thisMonthTotal.mins : 0}min.</div>
                    </div>
                </div>
                <div className="rowTitle">Average Result</div>
                <div className="row">
                    <div className="square">
                        <div className="squareTitle">Day</div>
                        <div className="squareData">{charts.dailyAverage && true ? charts.dailyAverage.hours : 0}hrs., {charts.dailyAverage && true ? charts.dailyAverage.mins : 0}min.</div>
                    </div>
                    <div className="square">
                        <div className="squareTitle">Week</div>
                        <div className="squareData">{charts.weeklyAverage && true ? charts.weeklyAverage.hours : 0}hrs., {charts.weeklyAverage && true ? charts.weeklyAverage.mins : 0}min.</div>
                    </div>
                    <div className="square">
                        <div className="squareTitle">Month</div>
                        <div className="squareData">{charts.monthlyAverage && true ? charts.monthlyAverage.hours : 0}hrs., {charts.monthlyAverage && true ? charts.monthlyAverage.mins : 0}min.</div>
                    </div>
                </div>
                <div className="rowTitle">Best Result</div>
                <div className="row">
                    <div className="square">
                        <div className="squareTitle">Day</div>
                        <div className="squareData">{charts.bestDay && true ? charts.bestDay.hours : 0}hrs., {charts.bestDay && true ? charts.bestDay.mins : 0}min.</div>
                    </div>
                    <div className="square">
                        <div className="squareTitle">Week</div>
                        <div className="squareData">{charts.bestWeek && true ? charts.bestWeek.hours : 0}hrs., {charts.bestWeek && true ? charts.bestWeek.mins : 0}min.</div>
                    </div>
                    <div className="square">
                        <div className="squareTitle">Month</div>
                        <div className="squareData">{charts.bestMonth && true ? charts.bestMonth.hours : 0}hrs., {charts.bestMonth && true ? charts.bestMonth.mins : 0}min.</div>
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