import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe(import.meta.env.VITE_stripe_key);
const Payment = () => {
    
    return (
        <div>
            <SectionTitle title={'Payment Gateway'} subTitle={'please payment'}></SectionTitle>
            <Elements stripe={stripePromise}>
                <CheckoutForm></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;