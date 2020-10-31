import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import TaskSession from './TaskSession'


const FeedList = ({ feed }) => {
    const renderFeed = () => {
        return feed.map((feedItem) => {
            if (feedItem.displayType === 'tasksession' || feedItem.displayType === 'taskcompleted') {
                return (
                    <TaskSession feedItem={feedItem} />
                )
            }

            return <div>{feedItem.generalDescription}</div>
        })
    }

    return (
        <div className="feed-list">
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