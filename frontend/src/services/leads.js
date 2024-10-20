import axios from 'axios';

const API_URL = 'https://smallbiggrowth.onrender.com';

export const leadsService = {


    async revealEmail(leadId) {
        const { data } = await axios.post(`${API_URL}/leads/${leadId}/reveal`, {}, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return data;
    }
};