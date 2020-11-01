import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { AiFillFire } from 'react-icons/ai'
import Overlay from '../../Overlay'

const FriendStreaksFake = () => {
    return (
        <div className="friend-streaks">
            <Overlay />
            <div className='friend-streaks__title-container' style={{ marginBottom: '10px' }}>
                <div>Friend Current Streaks</div>
            </div>
            <div className="friend-modal-friend-list-item">
                <div>
                    <div id='fake-blur' style={{ textTransform: 'capitalize' }} className="friend-modal-friend-list-item__name">
                        Friend One
                    </div>
                </div>
                <div>
                    <AiFillFire className="toggleContainer__streak__icon" style={{ fontSize: '15px' }} />
                    15
                </div>
            </div>
            <div className="friend-modal-friend-list-item">
                <div>
                    <div id='fake-blur' style={{ textTransform: 'capitalize' }} className="friend-modal-friend-list-item__name">
                        Friend Two
                    </div>
                </div>
                <div>
                    <AiFillFire className="toggleContainer__streak__icon" style={{ fontSize: '15px' }} />
                    12
                </div>
            </div>
            <div className="friend-modal-friend-list-item">
                <div>
                    <div id='fake-blur' style={{ textTransform: 'capitalize' }} className="friend-modal-friend-list-item__name">
                        Friend Three
                    </div>
                </div>
                <div>
                    <AiFillFire className="toggleContainer__streak__icon" style={{ fontSize: '15px' }} />
                    9
                </div>
            </div>
            <div className="friend-modal-friend-list-item">
                <div>
                    <div id='fake-blur' style={{ textTransform: 'capitalize' }} className="friend-modal-friend-list-item__name">
                        Friend Four
                    </div>
                </div>
                <div>
                    <AiFillFire className="toggleContainer__streak__icon" style={{ fontSize: '15px' }} />
                    7
                </div>
            </div>
            <div className="friend-modal-friend-list-item">
                <div>
                    <div id='fake-blur' style={{ textTransform: 'capitalize' }} className="friend-modal-friend-list-item__name">
                        Friend Five
                    </div>
                </div>
                <div>
                    <AiFillFire className="toggleContainer__streak__icon" style={{ fontSize: '15px' }} />
                    4
                </div>
            </div>
        </div>
    )
}

export default FriendStreaksFake