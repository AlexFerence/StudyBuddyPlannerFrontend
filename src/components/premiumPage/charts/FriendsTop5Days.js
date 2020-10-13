import React from 'react'
import { connect } from 'react-redux';
import moment from 'moment'
import { AnimatedList } from 'react-animated-list';

const Top5TasksChart = ({ top5DaysFriends }) => {

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
    if (top5DaysFriends.length === 0) {
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
                        Freinds Most Studied Days
                    </h2>
                </div>
                <ol className="top-five__list">
                    <AnimatedList animation={"grow"}>
                        {top5DaysFriends && top5DaysFriends.map((day) => {
                            index++
                            return (
                                <li key={index} className="top-five__list__item">
                                    <div className="top-five__list__item__left">
                                        <div>
                                            <span className="top-five__list__item__num">{index}</span>
                                        </div>
                                        <span className="top-five__list__item__title">{moment(day.bestDayDate).format('MMM D, YYYY') + ' - ' + day.firstName + ' ' + day.lastName}</span>

                                    </div>
                                    <span className="top-five__list__item__time-spent">{minsToHours(day.minutes)}</span>
                                </li>
                            )
                        })}
                    </AnimatedList>
                </ol>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        top5DaysFriends: state.premiumStats.top5DaysFriends
    }
}


export default connect(mapStateToProps)(Top5TasksChart)