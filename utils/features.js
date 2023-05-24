const User = require("../models/user")
const jwt = require("jsonwebtoken")
require("dotenv").config();

exports.sendCookiesData = async (user, res, message, statusCode = 200) => {
    const payload = {
        email: user.email,
        _id: user._id
    };
    const options = {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
    };

    const token = jwt.sign(payload, process.env.JWT_SCRET_KEY);

    user.password = undefined;

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        message,
        user,
    })
};