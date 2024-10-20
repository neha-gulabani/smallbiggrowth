require('dotenv').config({ path: './.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes1 = require('./routes/auth');
const payRoutes = require('./routes/pay');
const authRouter2 = require('./routes/authRoutes');

const app = express();

// Enhanced CORS configuration
app.use(cors({
    origin: 'https://smallbiggrowth-lbk3-h0trldugh-nehas-projects-390c535b.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());

// Security headers
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

// Routes
app.use('/api/auth', authRoutes1);
app.use('/api/v1/auth/', authRouter2);
app.use('/payment', payRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connected'))
    .catch((error) => console.log('MongoDB connection error:', error));

app.listen(5001, () => {
    console.log(`Server running at https://smallbiggrowth.onrender.com`);
});