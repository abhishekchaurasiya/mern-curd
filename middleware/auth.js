
const jwt = require("jsonwebtoken")
require("dotenv").config();

exports.isAuthenticate = async (req, res, next) => {
    try {
        let token = req.body.token || req.cookies.token;
        if (!token || token === undefined) return res.status(401).json({
            status: false,
            message: "Please login first!"
        });

        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SCRET_KEY);
            req.user = decodedToken;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            })
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong, while verifying the token"
        })
    }
};
