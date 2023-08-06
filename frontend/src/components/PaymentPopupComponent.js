import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {Elements} from '@stripe/react-stripe-js';
import CheckoutFormComponent from "./CheckoutFormComponent";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

export default function PaymentPopupComponent({amountToPay}){
    const dispatch = useDispatch();

    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        const actionToConfigStripeSetup = async ()=>{
            try {
                const response = await fetch('https://api.dxofficialtrading.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        endpoint: 'publishkey',
                    }),
                });
                const data = await response.json();
                if(data?.publishableKey){
                    setStripePromise(data?.publishableKey);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }

        const actionToCreatePaymentIntend = async ()=>{
            try {
                const response = await fetch('https://api.dxofficialtrading.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        endpoint: 'getintend',
                    }),
                });
                const data = await response.json();
                if(data?.clientSecret){
                    setClientSecret(data?.clientSecret);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }

        actionToConfigStripeSetup();
        actionToCreatePaymentIntend();
    }, []);

    return (
        <>
            {clientSecret && stripePromise && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutFormComponent/>
                </Elements>
            )}
        </>
    )
}
