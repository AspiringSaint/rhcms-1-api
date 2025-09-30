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


const getPatients = asyncHandler ( async (req, res) => {
    const patients = await Patient.find();

    if (!patients) {
        return res.status(404).json({ message: 'No patient records yet' });
    }

    res.status(200).json(patients);
});


const getPatientById = asyncHandler ( async (req, res) => {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Patient Id' });
    }

    const patient = await Patient.findById(id);
    if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
    };

    res.status(200).json(patient);
})

module.exports = {
    createPatient,
    getPatients,
    getPatientById
};