const User = require("../models/user");
const bcrypt = require("bcrypt");;
const Joi = require("joi");
const { sendCookiesData } = require("../utils/features");

exports.signUp = async (req, res) => {
    try {

        // validate input field with joi library
        const userSchema = Joi.object({
            name: Joi.string().required().min(3).max(30),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
            password: Joi.string().min(8).max(25)
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/,
                    'password').required()
        });
        
        const { error } = userSchema.validate(req.body);
        if (error) return res.status(401).json({ message: error.message });

        // data fetch for req body
        const { name, email, phoneNumber, password } = req.body;

        // check existing user
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(402).json({
                success: false,
                message: 'Email is already exist.'
            });
        }

        // hashing password and phone number
        const salt = await bcrypt.genSalt(10)
        const hashPhoneNumber = await bcrypt.hash(phoneNumber, salt)
        const hashPassword = await bcrypt.hash(password, salt);

        // Entry in our db 
        let newUser;
        try {
            newUser = new User({
                name,
                email,
                phoneNumber: hashPhoneNumber,
                password: hashPassword
            });
            await newUser.save();
        } catch (error) {
            return res.status(500).json({
                success: false,
                messge: "Databaes error",
                error: error.message
            })
        };

        sendCookiesData(newUser, res, "User registered successfully", 201)

    } catch (error) {
        return res.status(500).json({
            success: false,
            messge: "Internal server error",
            error: error.message
        })
    }
};

exports.login = async (req, res) => {
    try {
        // validate input field with joi library
        const userSchema = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().min(8).max(25)
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/,
                    'password').required()
        });

        const { error } = userSchema.validate(req.body);
        if (error) return res.status(401).json({ message: error.message });

        const { email, password } = req.body;

        let user = await User.findOne({ email }).select("+password");
        const { name } = user;
        const resName = name.charAt(0).toUpperCase() + name.slice(1);

        if (!user) return res.status(400).json({
            success: false,
            message: "Invalid email and password"
        })

        const isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) return res.status(400).json({
            success: false,
            message: "Invalid email and password"
        })

        // return response
        sendCookiesData(user, res, `${resName} you are logged in successfully`, 200)
    } catch (error) {
        return res.status(500).json({
            success: false,
            messge: "Internal server error",
            error: error.message
        })
    }
};

exports.logout = async (req, res) => {
    try {
        res.status(200).cookie("token", "", {
            expires: new Date(Date.now()),
        }).json({
            success: true,
            message: "User has been successfully Logout",
            user: req.user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            messge: "Internal server error",
            error: error.message
        })
    }
};

exports.showUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password -phoneNumber -__v -updatedAt");
        if (!user || user === undefined) return res.status(400).json({
            success: false,
            messge: "User is not found"
        });

        res.status(200).json({
            success: true,
            message: "Get user details",
            user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            messge: "Internal server error",
            error: error.message
        })
    }
};