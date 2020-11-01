import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getFriendStreaks } from '../../../thunks/friendThunk'
import { AnimatedList } from 'react-animated-list';
import { AiFillFire } from 'react-icons/ai'
import FriendStreaksFake from '../fakeDisplays/FriendStreaksFake'

let notPremium = true

const FriendStreaks = ({ dispatch, friendStreaks = [] }) => {

    useEffect(() => {
        dispatch(getFriendStreaks())
    }, [])

    friendStreaks.sort((a, b) => b.value1 - a.value1)

    if (notPremium) {
        return (
            <FriendStreaksFake />
        )
    }


    return (
        <div className="friend-streaks">
            <div className='friend-streaks__title-container' style={{ marginBottom: '10px' }}>
                <div>Friend Current Streaks</div>
            </div>
            <AnimatedList animation={"grow"}>
                {
                    friendStreaks.map((friend) => {
                        return (
                            <div key={friend.name1} className="friend-modal-friend-list-item">
                                <div>
                                    <div style={{ textTransform: 'capitalize' }} className="friend-modal-friend-list-item__name">
                                        {friend.name1}
                                    </div>
                                </div>
                                <div>
                                    <AiFillFire className="toggleContainer__streak__icon" style={{ fontSize: '15px' }} />
                                    {friend.value1}
                                </div>
                            </div>
                        )
                    })
                }
            </AnimatedList>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        friendStreaks: state.friends?.friendStreaks?.responseItems
    }
}

export default connect(mapStateToProps)(FriendStreaks)