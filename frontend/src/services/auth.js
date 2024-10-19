import axios from 'axios';

const API_URL = 'http://localhost:5001';


const login = async (email, password) => {
    try {
        const res = await axios.post(`${API_URL}/api/auth/login`, {
            email,
            password
        }, { withCredentials: true });

        if (res) {
            return res.data;
        }
    } catch (error) {
        throw error;
    }
};

const signup = async (name, email, password) => {
    try {
        const res = await axios.post(`${API_URL}/api/auth/signup`, {
            name,
            email,
            password
        }, { withCredentials: true });


        if (res) {

            return res.data;
        }
    } catch (error) {
        throw error;
    }
};



function logout() {
    localStorage.removeItem('token');
    window.location.href = 'http://localhost:3000/login'
}

export { login, signup, logout }