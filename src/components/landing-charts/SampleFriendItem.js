import React from 'react'
import { FaBookReader } from 'react-icons/fa'

const SampleFriendComp = ({ initials, name, subj, taskType, active = 0, bottom }) => {
    return (
        <div className="active-friend" style={bottom ? { color: 'white', backgroundColor: '#3a3a3a' } :
            { color: 'white', backgroundColor: '#3a3a3a', borderBottom: '1px solid #7c7c7c' }
        }>
            <div className="active-friend__left">
                <div className="active-friend__left__avatar-container">
                    <div className="active-friend__left__avatar">
                        {initials}
                    </div>
                </div>
                <div className="active-friend__left__credentials">
                    <div className="active-friend__left__credentials__name">{name}</div>
                    <div className="active-friend__left__credentials__class">{subj}</div>
                    {/* TASK TYPE DOESNT RETURN ANYTHING */}
                    <div className="active-friend__left__credentials__task-type">{taskType}</div>
                </div>
            </div>
            <div className="col-center">
                <div className="last-active-icon">
                    {active === 0 ? <FaBookReader /> : active + 'm'}
                </div>
            </div>
        </div>
    )
}


export default SampleFriendComp