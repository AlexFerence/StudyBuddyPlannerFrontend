import React, { useEffect } from 'react';
import { Elements, ELEMENT } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { loadPaymentOptions } from '../../thunks/settingsThunk'
import { connect } from 'react-redux'
import Card from './subCard'

const stripePromise = loadStripe("pk_live_51HHYysGxfzAdmwjMhM74G9cXIQkY5dsf1tRaEDMUun5dyAHBy117237KBazSiXdIVOTo0Wci3NTCBzryOzXiKuW700iVPagWci");

const PaymentForm = ({ dispatch, subscriptions }) => {
    useEffect(() => {
        //load payment options here
        dispatch(loadPaymentOptions())
    }, [])

    return (
        <Elements stripe={stripePromise}>
            <div className="cardContainer">
                options
                {
                    subscriptions.length > 0 &&
                    subscriptions.map((sub) => {
                        return (
                            <Card sub={sub} />
                        )
                    })
                }
            </div>
            <CheckoutForm />
        </Elements>
    )
}

const mapStateToProps = (state) => {
    return {
        subscriptions: state.subscriptions.subscriptions,
    }
}



export default connect(mapStateToProps)(PaymentForm);




