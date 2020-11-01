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

            else if (feedItem.displayType === 'streak') {
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
                style={{
                    padding: '15px', borderBottom: '1px solid #d3d3d3',
                    color: 'black', fontSize: '18px'
                }}
            >Friend Activity</h2>
            {renderFeed()}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        feed: state.feed
    }
}

export default connect(mapStateToProps)(FeedList)