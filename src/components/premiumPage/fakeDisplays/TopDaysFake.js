import React from 'react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import PremiumOverlay from '../../Overlay'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const TopAssignmentDisplay = () => {
    return (
        <div className="top-five">
            <PremiumOverlay />
            <div className="top-five__title-container">
                <h2 className="top-five__title-container__title">
                    Most Studied Days
                    </h2>
                <FormControl component="fieldset">
                    <RadioGroup row className="top-five__title-container__radio-container"

                    >
                        <FormControlLabel style={{ marginRight: '0px', width: '100px' }} value='true' control={<Radio color="default" size="small" />} label="Myself" />
                        <FormControlLabel style={{ marginRight: '0px', width: '100px' }} value='false' control={<Radio color="default" size="small" />} label="Friends" />
                    </RadioGroup>
                </FormControl>
            </div>
            <ol className="top-five__list">
                <li key={1} className="top-five__list__item">
                    <div className="top-five__list__item__left">
                        <div>
                            <span className="top-five__list__item__num"
                            >1</span>
                        </div>
                        <span id='fake-blur' className="top-five__list__item__title">Oct 25, 2020</span>
                    </div>
                    <span className="top-five__list__item__time-spent">9hrs., 52mins.</span>
                </li>
                <li key={2} className="top-five__list__item">
                    <div className="top-five__list__item__left">
                        <div>
                            <span className="top-five__list__item__num"
                            >2</span>
                        </div>
                        <span id='fake-blur' className="top-five__list__item__title">Oct 1, 2020</span>
                    </div>
                    <span className="top-five__list__item__time-spent">6hrs., 14mins.</span>
                </li>
                <li key={3} className="top-five__list__item">
                    <div className="top-five__list__item__left">
                        <div>
                            <span className="top-five__list__item__num"
                            >3</span>
                        </div>
                        <span id='fake-blur' className="top-five__list__item__title">Sept 30, 2020</span>
                    </div>
                    <span className="top-five__list__item__time-spent">5hrs., 42mins.</span>
                </li>
                <li key={4} className="top-five__list__item">
                    <div className="top-five__list__item__left">
                        <div>
                            <span className="top-five__list__item__num"
                            >4</span>
                        </div>
                        <span id='fake-blur' className="top-five__list__item__title">Oct 8, 2020</span>
                    </div>
                    <span className="top-five__list__item__time-spent">5hrs., 12mins.</span>
                </li>
                <li key={5} className="top-five__list__item">
                    <div className="top-five__list__item__left">
                        <div>
                            <span className="top-five__list__item__num"
                            >5</span>
                        </div>
                        <span id='fake-blur' className="top-five__list__item__title">Oct 14, 2020</span>
                    </div>
                    <span className="top-five__list__item__time-spent">3hrs., 22mins.</span>
                </li>
            </ol>
        </div>
    )
}

export default TopAssignmentDisplay