import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import './CardSectionStyles.scss'

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: "#32325d",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#aab7c4",
            },
            padding: "30px",
            width: "100px",
            height: "40px"
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
        },
    },
};

function CardSection() {
    return (
        <label>


            <CardElement options={CARD_ELEMENT_OPTIONS} />
        </label>
    );
};

export default CardSection;