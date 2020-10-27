import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import moment from 'moment'
import { AnimatedList } from 'react-animated-list';
import TopDaysFake from '../fakeDisplays/TopDaysFake'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

var notPremium = true

const Top5TasksChart = ({ top5Days, top5DaysFriends }) => {

    const [myself, setMyself] = useState('true')

    useEffect(() => {
        console.log('myself changed ' + myself)
    }, [myself])

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
    if (notPremium) {
        return (
            <TopDaysFake />
        )
    }


    else {
        var index = 0;
        return (
            <div className="top-five">
                <div className="top-five__title-container">
                    <h2 className="top-five__title-container__title">
                        Most Studied Days
                    </h2>
                    <FormControl component="fieldset">
                        <RadioGroup row className="top-five__title-container__radio-container"
                            onChange={(e) => {
                                console.log(e.target.value)
                                setMyself(e.target.value)
                            }}
                            value={myself}
                        >
                            <FormControlLabel style={{ marginRight: '0px', width: '100px' }} value='true' control={<Radio color="default" size="small" />} label="Myself" />
                            <FormControlLabel style={{ marginRight: '0px', width: '100px' }} value='false' control={<Radio color="default" size="small" />} label="Friends" />
                        </RadioGroup>
                    </FormControl>
                </div>

                { myself === 'true' ?
                    <ol className="top-five__list">
                        <AnimatedList animation={"grow"}>
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
                        </AnimatedList>
                    </ol>
                    :
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



                }


            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        top5Days: state.premiumStats.top5Days,
        top5DaysFriends: state.premiumStats.top5DaysFriends
    }
}


export default connect(mapStateToProps)(Top5TasksChart)