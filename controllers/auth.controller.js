const Staff = require('../models/Staff');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');

/**
 * @description Create new staff
 * @route POST api/auth/register
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


module.exports = {
    register
}