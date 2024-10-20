import axios from 'axios';

const API_URL = 'https://smallbiggrowth.onrender.com';

export const paymentService = {
    async createOrder(leadId) {
        const { data } = await axios.post(
            `${API_URL}/payments/create-order`,
            { leadId },
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            }
        );
        return data;
    },

    async verifyPayment(paymentData) {
        const { data } = await axios.post(
            `${API_URL}/payments/verify`,
            paymentData,
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            }
        );
        return data;
    }
};