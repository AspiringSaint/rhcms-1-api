const Staff = require('../models/Staff');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

/**
 * @description Create new staff
 * @route POST /api/auth/register
 * @access Private - Admin only
 */
const register = asyncHandler ( async (req, res) => {
    const { name, role, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Missing fields' });
    }

    const exist = await Staff.findOne({ email });
    if (exist) {
        return res.status(400).json({ message: 'Staff already exists' });
    };

    const hashedPassword = await bcrypt.hash(password, 10);
    const staff = await Staff.create({
        name, 
        role,
        email,
        password: hashedPassword
    });

    if (!staff) {
        return res.status(400).json({ message: 'Staff creation failed' });
    }

    res.status(201).json({ message: 'New staff created'});
});


/**
 * @description Login with email and password
 * @route POST /api/auth/login
 * @access Public
 */ 
const login = asyncHandler ( async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Provide email and password' });
    };

    const staff = await Staff.findOne({ email });
    if (!staff || staff.status === 'inactive') {
        return res.status(404).json({ message: 'Invalid credentials' });
    }

    let match = await bcrypt.compare(password, staff.password);
    if (!match) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
        {
            id: staff._id,
            role: staff.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    );

    const refresh = jwt.sign(
        {
            id: staff._id,
            role: staff.role
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );

    res.cookie('jwt', refresh, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({ token });
})


/**
 * @description Logout 
 * @route /api/auth/logout
 * @access Public
 */
const logout = asyncHandler ( async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.sendStatus(204);
    };

    res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    });

    res.status(200).json({ message: 'Logged out successfully' });
})


module.exports = {
    register,
    login,
    logout
}