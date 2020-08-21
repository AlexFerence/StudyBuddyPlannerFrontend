import React from 'react';
import { connect } from 'react-redux';
import { setCurrentSubscription } from '../../actions/subscriptionActions'

const Card = ({ sub, dispatch, subscriptions, profile }) => {


    const handleSelect = () => {
        dispatch(setCurrentSubscription(sub))
    }

    return (
        <div className="subCard"
            onClick={handleSelect}
            style={subscriptions.currentSubscription.id === sub.id ?
                { border: '1px solid red' } :
                {}
            }

        >
            <div className="subCard__title">{sub.interval}ly</div>

            <div className="subCard__price">${sub.amount / 100}</div>
            <div className="subCard__sub-text">per {sub.interval}</div>
            <div className="subCard__sub-text">billed {sub.interval}ly</div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        subscriptions: state.subscriptions,

    }
}

export default connect(mapStateToProps)(Card);

