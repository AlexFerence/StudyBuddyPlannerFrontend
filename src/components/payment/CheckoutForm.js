import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { connect } from 'react-redux';
import CardSection from './CardSection';
import { createSubscription } from '../../thunks/settingsThunk';
import url from '../../environment/url'

const CheckoutForm = ({ dispatch, profile, subscriptions }) => {
    const stripe = useStripe();
    const elements = useElements();

    const showCardError = (error) => {
        alert(error);
    }

    function onSubscriptionComplete(result) {
        // Payment was successful.
        if (result.subscription.status === 'active') {
            // Change your UI to show a success message to your customer.
            // Call your backend to grant access to your service based on
            // `result.subscription.items.data[0].price.product` the customer subscribed to.
        }
    }

    function handleRequiresPaymentMethod({
        subscription,
        paymentMethodId,
        priceId,
    }) {
        if (subscription.status === 'active') {
            // subscription is active, no customer actions required.
            return { subscription, priceId, paymentMethodId };
        } else if (
            subscription.latest_invoice.payment_intent.status ===
            'requires_payment_method'
        ) {
            // Using localStorage to manage the state of the retry here,
            // feel free to replace with what you prefer.
            // Store the latest invoice ID and status.
            localStorage.setItem('latestInvoiceId', subscription.latest_invoice.id);
            localStorage.setItem(
                'latestInvoicePaymentIntentStatus',
                subscription.latest_invoice.payment_intent.status
            );
            throw { error: { message: 'Your card was declined.' } };
        } else {
            return { subscription, priceId, paymentMethodId };
        }
    }

    function handlePaymentThatRequiresCustomerAction({
        subscription,
        invoice,
        priceId,
        paymentMethodId
    }) {
        let setupIntent = subscription.pending_setup_intent;

        if (setupIntent && setupIntent.status === 'requires_action') {
            return stripe
                .confirmCardSetup(setupIntent.client_secret, {
                    payment_method: paymentMethodId,
                })
                .then((result) => {
                    if (result.error) {
                        // start code flow to handle updating the payment details
                        // Display error message in your UI.
                        // The card was declined (i.e. insufficient funds, card has expired, etc)
                        throw result;
                    } else {
                        if (result.setupIntent.status === 'succeeded') {
                            // There's a risk of the customer closing the window before callback
                            // execution. To handle this case, set up a webhook endpoint and
                            // listen to setup_intent.succeeded.
                            return {
                                priceId: priceId,
                                subscription: subscription,
                                invoice: invoice,
                                paymentMethodId: paymentMethodId,
                            };
                        }
                    }
                });
        }
        else {
            // No customer action needed
            return { subscription, priceId, paymentMethodId };
        }
    }

    function createSubscription({ customerId, paymentMethodId, priceId }) {
        console.log(paymentMethodId)
        console.log(subscriptions.currentSubscription.id)

        return (
            fetch(url + '/api/UserBilling/createsubscription', {
                method: 'post',
                headers: {
                    'Authorization': 'bearer ' + profile.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: profile.userBilling.id,
                    paymentMethodId: paymentMethodId,
                    customerId: profile.userBilling.stripeCustomerId,
                    priceId: subscriptions.currentSubscription.id
                }),
            })
                .then((response) => {
                    console.log(" first " + response)
                    return response.json();
                })
                // If the card is declined, display an error to the user.
                .then((result) => {
                    console.log(" declined " + result)
                    if (result.error) {

                        // The card had an error when trying to attach it to a customer.
                        throw result;
                    }
                    return result;
                })
                // Normalize the result to contain the object returned by Stripe.
                // Add the additional details we need.
                .then((result) => {
                    return {
                        paymentMethodId: paymentMethodId,
                        priceId: priceId,
                        subscription: result,
                    };
                })
                // Some payment methods require a customer to be on session
                // to complete the payment process. Check the status of the
                // payment intent to handle these actions.
                .then(handlePaymentThatRequiresCustomerAction)
                // If attaching this card to a Customer object succeeds,
                // but attempts to charge the customer fail, you
                // get a requires_payment_method error.
                .then(handleRequiresPaymentMethod)
                // No more actions required. Provision your service for the user.
                .then(onSubscriptionComplete)
                .catch((error) => {
                    // An error has happened. Display the failure to the user here.
                    // We utilize the HTML element we created.
                    showCardError(error);
                })
        )
    }


    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            console.log(' no elements ')

            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);

        // If a previous payment was attempted, get the latest invoice
        const latestInvoicePaymentIntentStatus = localStorage.getItem(
            'latestInvoicePaymentIntentStatus'
        );

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.log('[createPaymentMethod error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            const paymentMethodId = paymentMethod.id;
            if (latestInvoicePaymentIntentStatus === 'requires_payment_method') {
                // Update the payment method and retry invoice payment
                // const invoiceId = localStorage.getItem('latestInvoiceId');
                // retryInvoiceWithNewPaymentMethod({
                //     customerId,
                //     paymentMethodId,
                //     invoiceId,
                //     priceId,
                // });
            } else {
                // Create the subscription
                createSubscription({ paymentMethodId });

            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardSection />
            <button disabled={!stripe}>Confirm order</button>
        </form>
    );
}

const mapStateToProps = (state) => {
    return {
        firstName: state.profile.firstName,
        lastName: state.profile.lastName,
        emailProp: state.profile.email,
        passwordProp: state.profile.password,
        token: state.profile.token,
        id: state.profile.id,
        schools: state.schools,
        faculties: state.faculties,
        profile: state.profile,
        subscriptions: state.subscriptions
    }
}

export default connect(mapStateToProps)(CheckoutForm)