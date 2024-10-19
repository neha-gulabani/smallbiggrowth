import axios from 'axios';

const API_URL = 'http://localhost:5001';

export const leadsService = {


    async revealEmail(leadId) {
        const { data } = await axios.post(`${API_URL}/leads/${leadId}/reveal`, {}, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return data;
    }
};