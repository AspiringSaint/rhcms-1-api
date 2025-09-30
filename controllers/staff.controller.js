const Staff = require('../models/Staff');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const mongoose  = require('mongoose');


const createStaff = asyncHandler(async (req, res) => {
    const { name, role, specialty, email, password } = req.body;

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
        specialty,
        email,
        password: hashedPassword
    });

    if (!staff) {
        return res.status(400).json({ message: 'Staff creation failed' });
    }

    res.status(201).json({ message: 'New staff created' });
});


const getAllStaff = asyncHandler ( async (req, res) => {
    const staffs = await Staff.find().select('-password');

    if (!staffs?.length === 0) {
        return res.status(400).json({ message: 'No current staffs' });
    };

    res.status(200).json(staffs);
});

const getStaffById = asyncHandler ( async (req, res) => {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Staff Id' });
    }

    const staff = await Staff.findById(id).select('-password');
    if (!staff) {
        return res.status(404).json({ message: 'Staff not found' });
    };

    res.status(200).json(staff);
})

module.exports = {
    createStaff,
    getAllStaff,
    getStaffById
};