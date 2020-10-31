import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getSuggestedFriends } from '../../../thunks/friendThunk'
import SuggestedFriendListItem from './SuggestedFriendListItem'
import { IoIosRefresh } from 'react-icons/io'
import { AnimatedList } from 'react-animated-list';

const SuggestedFriends = ({ dispatch, suggestedFriends }) => {

    const [high, setHigh] = useState(5)

    useEffect(() => {
        dispatch(getSuggestedFriends())
        console.log('High ' + high)
        console.log('Low' + (high - 5))
    }, [])

    const nextFive = () => {
        high === 15 ? setHigh(5) : setHigh(high + 5)

    }

    let index = -1

    var sfFiltered = suggestedFriends.filter((friend) => {
        index++
        return (index < high && index >= (high - 5))

    })

    return (
        <div className="suggested-friends">
            <div className='suggested-friends__title-container'>
                <div>Suggested Friends</div>
                <div className='suggested-friends__title-container__refresh'>
                    <IoIosRefresh onClick={() => nextFive()} />
                </div>
            </div>
            <AnimatedList animation={"grow"}>
                {
                    sfFiltered.map((friend) => {
                        return (
                            <SuggestedFriendListItem key={friend.id} friend={friend} />
                        )
                        index++
                    })
                }
            </AnimatedList>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        suggestedFriends: state.friends.suggestedFriends
    }
}

export default connect(mapStateToProps)(SuggestedFriends)