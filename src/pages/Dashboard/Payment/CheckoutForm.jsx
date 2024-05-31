import { CardElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxios from '../../../hooks/useAxios';
import useCart from '../../../hooks/useCart';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxios();
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [cart] = useCart();
    const price = cart.reduce((total, item) => total + item.price, 0);
    const { user } = useAuth();
    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price: price })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, price])
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email,
                    name: user?.displayName || 'annonymus'
                }
            }
        })
        if (confirmError) {
            console.log('confirm error');
        }
        else {
            console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);

                //save the payment in db
                const payment = {
                    email: user.email,
                    price: price,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    cartIds: cart.map(item => item._id),
                    menuIds: cart.map(item => item.menuId),
                    status: 'pending',
                }
                const res = await axiosSecure.post('/payments', payment);
                console.log(res.data);
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                      });
                }f
            }
        }

    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className='btn btn-primary' type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
    );
};

export default CheckoutForm;