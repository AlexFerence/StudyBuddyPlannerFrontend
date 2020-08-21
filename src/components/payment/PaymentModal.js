import React, { useEffect } from 'react';
import { Elements, ELEMENT } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { loadPaymentOptions } from '../../thunks/settingsThunk'
import { cancelSubscription } from '../../thunks/subscriptionThunk'
import { refreshUser } from '../../thunks/profileThunk'
import { connect } from 'react-redux'
import Card from './subCard'

const stripePromise = loadStripe("pk_live_51HHYysGxfzAdmwjMhM74G9cXIQkY5dsf1tRaEDMUun5dyAHBy117237KBazSiXdIVOTo0Wci3NTCBzryOzXiKuW700iVPagWci");

const PaymentForm = ({ dispatch, subscriptions = [], stripeStatus }) => {
    useEffect(() => {
        //load payment options here
        dispatch(loadPaymentOptions())
    }, [])

    const handleCancelSub = () => {
        // dispatch cancel route
        dispatch(cancelSubscription())
        dispatch(refreshUser())
    }

    return (
        <div>

            {stripeStatus !== "active" ?
                <Elements stripe={stripePromise}>
                    <div className="cardContainer">
                        options
                {
                            subscriptions.length > 0 &&
                            subscriptions.map((sub) => {
                                return (
                                    <Card key={sub.id} sub={sub} />
                                )
                            })
                        }
                    </div>
                    <CheckoutForm />
                </Elements>
                :
                <div>
                    Current Plan:

                    <button onClick={handleCancelSub}>Cancel Subscription</button>
                </div>
            }



        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        subscriptions: state.subscriptions.subscriptions,
        stripeStatus: state.profile.userBilling.stripeStatus,
    }
}



export default connect(mapStateToProps)(PaymentForm);




