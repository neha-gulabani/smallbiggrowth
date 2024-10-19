import React, { useState } from 'react';
import axios from 'axios';


interface Lead {
    id: number;
    firstName: string;
    lastName: string;
    company: string;
    jobTitle: string;
    email: string;
    linkedinProfile: string;
}

interface LeadCardProps {
    lead: Lead;
}

export default function LeadCard({ lead }: LeadCardProps) {
    const [isRevealed, setIsRevealed] = useState(false);

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        const isScriptLoaded = await loadRazorpayScript();
        if (!isScriptLoaded) {
            alert('Failed to load Razorpay SDK.');
            return;
        }

        // Create order via backend API
        const { data } = await axios.post('http://localhost:5001/payment/order', {
            amount: 1,
            currency: 'INR',
        });

        const { amount, order_id, currency } = data;


        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            amount: amount,
            currency: currency,
            name: 'Test Company',
            description: 'Test Transaction',
            order_id: order_id,
            handler: async (response: any) => {
                const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

                // Verify the payment via backend API
                const verifyResponse = await axios.post('http://localhost:5001/payment/payment-capture', {
                    order_id: razorpay_order_id,
                    payment_id: razorpay_payment_id,
                    signature: razorpay_signature
                });

                if (verifyResponse.data.status === 'Payment verified successfully') {
                    alert('Payment Successful!');
                    setIsRevealed(true);
                } else {
                    alert('Payment verification failed!');
                }
            },
            theme: {
                color: '#F37254'
            }
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
    };

    return (
        <div className="p-4 border rounded-lg shadow">
            <h2 className="text-xl font-semibold">
                {lead.firstName} {lead.lastName}
            </h2>
            <p className="text-gray-600">{lead.company}</p>
            <p className="text-gray-600">{lead.jobTitle}</p>
            <a
                href={lead.linkedinProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
            >
                LinkedIn Profile
            </a>

            <div className="mt-2 flex justify-between items-center">
                <p> Email: {isRevealed ? lead.email : '********'}</p>
                {!isRevealed && (
                    <button
                        onClick={handlePayment}
                        className="ml-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Reveal Email & Pay
                    </button>
                )}
            </div>
        </div>
    );
}
