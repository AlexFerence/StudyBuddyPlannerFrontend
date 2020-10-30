import React from 'react'
import { connect } from 'react-redux'


const FeedList = (feed) => {

    const renderFeed = () => (
        feed.map((feedItem) => {
            return (
                <div>{feedItem.generalDescription}</div>
            )

        })
    }

return (
    <div>
        {renderFeed}
    </div>
)
}

const mapStateToProps = (state) => {
    return {
        feed: state.feed
    }
}

export default connect(mapStateToProps)(FeedList)