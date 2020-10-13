import React from 'react'
import { connect } from 'react-redux';
import moment from 'moment'

const Top5TasksChart = ({ top5Days }) => {

    const minsToHours = (m) => {
        const hours = Math.floor(m / 60)
        const mins = Math.floor(m % 60)
        if (hours >= 1) {
            return (hours + 'hrs., ' + mins + 'min.')
        }
        else {
            return (mins + 'min.')
        }
    }
    if (top5Days.length === 0) {
        return (
            <div className="noData">
                <div>
                    No Data
                  <div className="subNoData">Create </div>
                </div>
            </div>
        )
    }
    else {

        var index = 0;

        return (
            <div className="top-five">
                <div className="top-five__title-container">
                    <h2 className="top-five__title-container__title">
                        My Most Studied Days
                    </h2>
                </div>
                <ol className="top-five__list">
                    {top5Days && top5Days.map((day) => {
                        index++
                        return (
                            <li key={index} className="top-five__list__item">
                                <div className="top-five__list__item__left">
                                    <div>
                                        <span className="top-five__list__item__num">{index}</span>
                                    </div>

                                    <span className="top-five__list__item__title">{moment(day.bestDayDate).format('MMM D, YYYY')}</span>
                                    <span className="top-five__list__item__title">{day.taskType}</span>

                                </div>
                                <span className="top-five__list__item__time-spent">{minsToHours(day.minutes)}</span>
                            </li>
                        )
                    })}
                </ol>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        top5Days: state.premiumStats.top5Days
    }
}


export default connect(mapStateToProps)(Top5TasksChart)