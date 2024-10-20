import axios from 'axios';

const API_URL = 'https://smallbiggrowth.onrender.com';


const login = async (email, password) => {
    try {
        const res = await axios.post(`${API_URL}/api/auth/login`, {
            email,
            password
        }, { withCredentials: true });
        console.log(res)

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
    window.location.href = 'https://smallbiggrowth-lbk3.vercel.app/login'
}

export { login, signup, logout }