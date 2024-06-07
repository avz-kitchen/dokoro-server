const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const { isAuthenticated } = require("./../middleware/jwt.middleware.js");

const router = express.Router();
const saltRounds = 10;

// POST /auth/signup  - Creates a new user in the database
router.post('/signup', async (req, res, next) => {
    try {
        const { email, password, username } = req.body;

        // Check if the email or password or username is provided as an empty string 
        if (email === '' || password === '' || username === '') {
            res.status(400).json({ message: "Provide email, password and username" });
            return;
        }

        // Use regex to validate the email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({ message: 'Provide a valid email address.' });
            return;
        }

        // Use regex to validate the password format
        const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if (!passwordRegex.test(password)) {
            res.status(400).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' });
            return;
        }

        // Check if a user with the same email already exists
        const foundUser = await User.findOne({ email });
        if (foundUser) {
            res.status(400).json({ message: "User already exists." });
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user in the database
        const createdUser = await User.create({ email, password: hashedPassword, username });

        // Omit the password and send the user object as response
        res.status(201).json({ user: { _id: createdUser._id, email: createdUser.email, username: createdUser.username } });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// POST /auth/login
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if email or password are provided as empty string 
        if (email === '' || password === '') {
            res.status(400).json({ message: "Provide email and password." });
            return;
        }

        // Find the user in the database
        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            res.status(401).json({ message: "User not found." });
            return;
        }

        // Compare passwords
        const passwordCorrect = await bcrypt.compare(password, foundUser.password);
        if (!passwordCorrect) {
            res.status(401).json({ message: "Wrong passwrod" });
            return;
        }

        // Create JWT token
        const { _id, email: emailFromUser, username } = foundUser;
        const payload = { _id, email: emailFromUser, username };
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, { algorithm: 'HS256', expiresIn: "6h" });
        res.status(200).json({ authToken });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// GET /auth/verify
router.get('/verify', isAuthenticated, (req, res, next) => {
    // If JWT token is valid, the payload gets decoded by the
    // isAuthenticated middleware and made available on `req.payload`
    console.log(`req.payload`, req.payload);
    // Send back the object with user data
    // previously set as the token payload
    res.status(200).json(req.payload);
});

module.exports = router;
