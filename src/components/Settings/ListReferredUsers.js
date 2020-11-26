import React from 'react'
import { FaCheck, FaUser } from 'react-icons/fa'
import { IoMdCheckmark, IoMdClose } from 'react-icons/io'
import { connect } from 'react-redux'

const ListReferredUsers = ({ referredUsers }) => {

    console.log(referredUsers)

    return (
        <div>
            {referredUsers.map((friend, index) => (
                <div key={index} id='whitehover' style={{ color: 'black' }} className="active-friend">
                    <div className="active-friend__left">
                        <div className="active-friend__left__avatar-container">
                            <div className="active-friend__left__avatar" style={{ color: 'black' }}>
                                {friend.firstName.length > 0 && friend.lastName.length > 0 ? friend.firstName[0].toUpperCase() + friend.lastName[0].toUpperCase() : <FaUser />}
                            </div>
                        </div>
                        <div className="active-friend__left__credentials">
                            <div style={{ color: 'black' }} className="active-friend__left__credentials__name">{friend.firstName + ' ' + friend.lastName}</div>
                            <div style={{ color: 'black' }} className="active-friend__left__credentials__class">{friend.major}</div>
                            <div style={{ color: 'black' }} className="active-friend__left__credentials__task-type">{friend.school}</div>
                        </div>
                    </div>
                    <div className="col-center">
                        <div>
                            Active: {friend.active === 'Active' ?
                                <IoMdCheckmark className='check' />
                                :
                                <IoMdClose className='close' />
                            }
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        referredUsers: state.settings.referredUsers
    }
}

export default connect(mapStateToProps)(ListReferredUsers)