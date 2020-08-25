import React, { useEffect } from 'react';
import { Elements, ELEMENT } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { loadPaymentOptions } from '../../thunks/settingsThunk'
import { cancelSubscription } from '../../thunks/subscriptionThunk'
import { refreshUser } from '../../thunks/profileThunk'
import { connect } from 'react-redux'
import Card from './subCard'
import { setCurrentSubscription } from '../../actions/subscriptionActions'

const stripePromise = loadStripe("pk_live_51HHYysGxfzAdmwjMhM74G9cXIQkY5dsf1tRaEDMUun5dyAHBy117237KBazSiXdIVOTo0Wci3NTCBzryOzXiKuW700iVPagWci");

const PaymentForm = ({ dispatch, subscriptions = [], stripeStatus, activeSub }) => {
    useEffect(() => {
        //load payment options here
        dispatch(loadPaymentOptions())
        if (subscriptions.length > 0) {
            dispatch(setCurrentSubscription(subscriptions[0]))
        }

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
                    <div className="settings-title">Premium Plans</div>
                    <div className="cardContainer">
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

                <div className="subCard" id="noHover">
                    <div className="subCard__title">{activeSub.interval}ly</div>

                    <div className="subCard__price">${activeSub.amount / 100}</div>
                    <div className="subCard__sub-text">per {activeSub.interval}</div>
                    <div className="subCard__sub-text">billed {activeSub.interval}ly</div>

                    <button className="but" onClick={handleCancelSub}>Cancel Subscription</button>
                </div>
            }



        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        subscriptions: state.subscriptions.subscriptions,
        stripeStatus: state.profile.userBilling.stripeStatus,
        activeSub: state.subscriptions.activeSub
    }
}



export default connect(mapStateToProps)(PaymentForm);




