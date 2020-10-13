import React from 'react'
import { connect } from 'react-redux';

const isPremium = true

const Top5TasksChart = ({ top5Assignments }) => {

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
    if (top5Assignments.length === 0) {
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
                        My Most Studied Tasks
                    </h2>
                </div>
                <ol className="top-five__list">
                    {top5Assignments && top5Assignments.map((assignment) => {
                        index++
                        return (
                            <li key={index} className="top-five__list__item">
                                <div className="top-five__list__item__left">
                                    <div>
                                        <span className="top-five__list__item__num">{index}</span>
                                    </div>
                                    <span className="top-five__list__item__title">{assignment.title + ' - '}</span>
                                    <span className="top-five__list__item__title">{assignment.taskType}</span>

                                </div>
                                <span className="top-five__list__item__time-spent">{minsToHours(assignment.minutes)}</span>
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
        top5Assignments: state.premiumStats.top5Assignments
    }
}


export default connect(mapStateToProps)(Top5TasksChart)