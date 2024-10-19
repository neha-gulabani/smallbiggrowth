const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    paymentId: {
        type: String,
        default: null
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true,
        default: 'INR'
    },
    receipt: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['created', 'pending', 'paid', 'failed', 'cancelled'],
        default: 'created'
    },
    paymentSignature: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Export the model
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;