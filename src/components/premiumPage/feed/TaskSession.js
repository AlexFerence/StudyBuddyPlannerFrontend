import React from 'react'

const TaskSession = ({ feedItem }) => {
    return (
        <div className="feed-item" >
            <div className="feed-initials">AF</div>
            <div className="feed-description">
                {feedItem.generalDescription}
                <span className="feed-description__time">
                    {feedItem.feedTime + ' ' + feedItem.feedUnit}
                </span>
            </div>
        </div>
    )
}

export default TaskSession