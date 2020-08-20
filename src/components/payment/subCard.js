import React from 'react';
import { connect } from 'react-redux';
import { setCurrentSubscription } from '../../actions/subscriptionActions'

const Card = ({ sub, dispatch }) => {

    const handleSelect = () => {
        dispatch(setCurrentSubscription(sub))
    }

    return (
        <div onClick={handleSelect}>
            <div>title: {sub.title}</div>
            <div>id: {sub.id}</div>
            <div>price: {sub.amount / 100}</div>
        </div>
    )
}

export default connect()(Card);

