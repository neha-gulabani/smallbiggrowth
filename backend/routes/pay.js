require('dotenv').config();
const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const app = express.Router();
const Order = require('../models/Order');


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// API to create a Razorpay order
app.post('/order', async (req, res) => {
    const { amount, currency } = req.body;

    if (!amount || !currency) {
        return res.status(400).json({ error: 'Amount and currency are required' });
    }

    const options = {
        amount: amount * 100, // amount in the smallest currency unit (paisa for INR)
        currency: currency,
        receipt: crypto.randomBytes(10).toString('hex'), // generating a random receipt
        payment_capture: 1 // Auto capture
    };

    try {
        const order = await razorpay.orders.create(options);
        const newOrder = new Order({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            receipt: order.receipt,
            status: 'created'
        });
        await newOrder.save();
        res.json({ order_id: order.id, currency: order.currency, amount: order.amount });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error creating order");
    }
});

// API to verify payment signature (important to validate the response from Razorpay)
app.post('/payment-capture', async (req, res) => {
    const { order_id, payment_id, signature } = req.body;

    const generatedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(`${order_id}|${payment_id}`)
        .digest('hex');

    if (generatedSignature === signature) {
        await Order.findOneAndUpdate(
            { orderId: order_id },
            { paymentId: payment_id, status: 'paid' }
        );
        res.json({ status: 'Payment verified successfully' });
    } else {
        res.status(400).json({ error: 'Payment verification failed' });
    }
});

module.exports = app;