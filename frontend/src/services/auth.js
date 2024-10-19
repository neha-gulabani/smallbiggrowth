import axios from 'axios';

const API_URL = 'http://localhost:5001';



function logout() {
    localStorage.removeItem('token');
    window.location.href = 'http://localhost:3000/login'
}

export { login, signup, googleAuth, logout }