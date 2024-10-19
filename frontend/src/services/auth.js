import axios from 'axios';

const API_URL = 'http://localhost:5001';


async function login(email, password) {
    const { data } = await axios.post(`${API_URL}/api/auth/login`, { email, password });
    localStorage.setItem('token', data.token);
    return data;
}

async function signup(email, password) {
    const { data } = await axios.post(`${API_URL}/api/auth/signup`, { email, password });
    localStorage.setItem('token', data.token);
    return data;
}

async function googleAuth(token) {
    const { data } = await axios.post(`${API_URL}/api/auth/google`, { token });
    localStorage.setItem('token', data.token);
    return data;
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = 'http://localhost:3000/login'
}
