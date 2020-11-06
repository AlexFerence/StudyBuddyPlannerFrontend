import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import TaskSession from './TaskSession'
import Streak from './Streak'
import BestDay from './BestDay'
import FiveHoursSpent from './FiveHoursSpent'
import StreakLarge from './StreakLarge'
import TaskCompleted from './TaskCompleted'
import FriendAdded from './FriendAdded'
//import InfiniteScroll from 'react-infinite-scroll-component';
import { refreshFeed } from '../../../thunks/feedThunk'
import InfiniteScroll from 'react-infinite-scroller';

const FeedList = ({ feed, dispatch }) => {
    const renderFeed = () => {
        return feed.map((feedItem, index) => {
            if (feedItem.displayType === 'tasksession') {
                return (
                    <TaskSession key={index} feedItem={feedItem} />
                )
            }
            else if (feedItem.displayType === 'streak' ||
                feedItem.displayType === 'streak5') {
                return (
                    <StreakLarge key={index} feedItem={feedItem} />
                )
            }
            else if (feedItem.displayType === 'taskcompleted') {
                return (
                    <TaskCompleted key={index} feedItem={feedItem} />
                )
            }
            else if (feedItem.displayType === 'fiveHoursSpent') {
                return (
                    <FiveHoursSpent key={index} feedItem={feedItem} />
                )
            }
            else if (feedItem.displayType === 'bestday') {
                return (
                    <BestDay key={index} feedItem={feedItem} />
                )
            }
            else if (feedItem.displayType === 'friendAccept') {
                return (
                    <FriendAdded key={index} feedItem={feedItem} />
                )
            }

            return <div key={index}>{feedItem.generalDescription}</div>
        })
    }


    const fetchMoreData = async () => {
        await dispatch(refreshFeed(20))
        console.log('Should fetch more data')
    }

    return (
        <div className="feed-list">
            <h2
                className='feed-list__header'
                style={{
                    fontSize: '18px', backgroundColor: '#f9f9f9'
                }}
            >Recent Updates</h2>
            <div className='feed-list__body'>
                {renderFeed()}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        feed: state.feed.list
    }
}

export default connect(mapStateToProps)(FeedList)