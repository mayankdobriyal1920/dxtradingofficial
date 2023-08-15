import React, {useEffect, useState} from "react";
import {Elements} from '@stripe/react-stripe-js';
import CheckoutFormComponent from "./CheckoutFormComponent";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe('pk_test_51ME77cSIFtW1VSPuewmIrcC2SSgHZi0ad2OuqicbcRiVpBRkRyVByCFEaIyb067eFhQL0GXaWVakkkZt5TuLFo6J005HlqBOck');
export default function PaymentPopupComponent({id,email,subscription}){
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        if(id) {
            const actionToCreatePaymentIntend = async () => {
                try {
                    const response = await fetch('https://api.dxofficialtrading.com', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id,
                            subscription,
                            endpoint: 'getintend',
                        }),
                    });
                    const data = await response.json();
                    if (data?.clientSecret) {
                        setClientSecret(data?.clientSecret);
                    }
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            }
            actionToCreatePaymentIntend();
        }
    }, [id]);

    return (
        <>
            {clientSecret && stripePromise && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutFormComponent id={id} email={email} subscription={subscription}/>
                </Elements>
            )}
        </>
    )
}
