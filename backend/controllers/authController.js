
const axios = require('axios');
const jwt = require('jsonwebtoken');

const oauth2Client = require('../utils/oauth2client');
const catchAsync = require('./../utils/catchAsync');

const User = require('../models/User');


const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};
// Create and send Cookie ->
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user.id);

    const cookieOptions = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        path: '/',
        secure: false,
    };


    user.password = undefined;

    res.cookie('jwt', token, cookieOptions);


    res.status(statusCode).json({
        message: 'success',
        token,
        data: {
            user,
        },
    });
};
/* GET Google Authentication API. */
exports.googleAuth = catchAsync(async (req, res, next) => {

    const code = req.query.code;


    const googleRes = await oauth2Client.getToken(code);


    oauth2Client.setCredentials(googleRes.tokens);


    const userRes = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );



    let user = await User.findOne({ email: userRes.data.email });


    if (!user) {
        console.log('New User found');
        user = await User.create({
            name: userRes.data.name,
            email: userRes.data.email,
        });
    }

    createSendToken(user, 201, res);
});