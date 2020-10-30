import React, { useEffect } from 'react'
import { connect } from 'react-redux'


const FeedList = ({ feed }) => {

    const renderFeed = () => {
        return feed.map((feedItem) => {
            if (feedItem.displayType === 'tasksession') {
                return (
                    <div
                        style={{ padding: '15px 10px' }}
                    >
                        <div
                            style={{ fontSize: '14px' }}
                        >{feedItem.generalDescription}
                            <span
                                style={{ color: 'red' }}
                            >{feedItem.feedTime + ' ' + feedItem.feedUnit}</span>
                        </div>
                    </div>
                )
            }
            else if (true) {
                return (
                    <div
                        style={{ padding: '15px 10px', color: 'grey' }}
                    >Not a task session</div>
                )

            }

            return <div>{feedItem.generalDescription}</div>
        })
    }

    return (
        <div>
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