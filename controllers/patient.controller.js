const Patient = require('../models/Patient');
const Staff = require('../models/Staff');
const Schedule = require('../models/Schedule');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const createPatient = asyncHandler ( async (req, res) => {
    const { firstName, lastName, suffix, dob, gender, address, contactNumber } = req.body;

    if (!firstName || !lastName || !dob || !gender || !address ) {
        return res.status(400).json({ message: 'Provide all fields' });
    }

    const newPatient = await Patient.create(
        {
            firstName,
            lastName,
            dob,
            suffix,
            gender,
            address,
            contactNumber
        }
    );

    if (!newPatient) {
        return res.status(400).json({ message: 'Cannot save patient data' });
    }

    res.status(201).json({ message: 'New patient data created successfully' });
});

module.exports = {
    createPatient
};