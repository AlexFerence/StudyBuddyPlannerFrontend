import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import TaskSession from './TaskSession'
import Streak from './Streak'

const FeedList = ({ feed }) => {
    const renderFeed = () => {
        return feed.map((feedItem) => {
            if (feedItem.displayType === 'tasksession' ||
                feedItem.displayType === 'taskcompleted' ||
                feedItem.displayType === 'bestday' ||
                feedItem.displayType === '' ||
                feedItem.displayType === 'fiveHoursSpent'

            ) {
                return (
                    <TaskSession feedItem={feedItem} />
                )
            }

            else if (feedItem.displayType === 'streak' ||
                feedItem.displayType === 'streak5') {
                return (
                    <Streak feedItem={feedItem} />
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
            >Friend Activity</h2>
            <div className='feed-list__body'>
                {renderFeed()}
            </div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        feed: state.feed
    }
}

export default connect(mapStateToProps)(FeedList)