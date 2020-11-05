import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import TaskSession from './TaskSession'
import Streak from './Streak'
import BestDay from './BestDay'
import FiveHoursSpent from './FiveHoursSpent'
import StreakLarge from './StreakLarge'
import TaskCompleted from './TaskCompleted'
import FriendAdded from './FriendAdded'

const FeedList = ({ feed }) => {
    const renderFeed = () => {
        return feed.map((feedItem) => {
            if (feedItem.displayType === 'tasksession') {
                return (
                    <TaskSession feedItem={feedItem} />
                )
            }
            else if (feedItem.displayType === 'streak' ||
                feedItem.displayType === 'streak5') {
                return (
                    <StreakLarge feedItem={feedItem} />
                )
            }
            else if (feedItem.displayType === 'taskcompleted') {
                return (
                    <TaskCompleted feedItem={feedItem} />
                )
            }
            else if (feedItem.displayType === 'fiveHoursSpent') {
                return (
                    <FiveHoursSpent feedItem={feedItem} />
                )
            }
            else if (feedItem.displayType === 'bestday') {
                return (
                    <BestDay feedItem={feedItem} />
                )
            }
            else if (feedItem.displayType === 'friendAccept') {
                return (
                    <FriendAdded feedItem={feedItem} />
                )
            }

            return <div>{feedItem.generalDescription}</div>
        })
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