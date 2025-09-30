const Schedule = require('../models/Schedule');
const Staff = require('../models/Staff');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

const createSchedule = asyncHandler ( async (req, res) => {
    const { doctorId, dayOfWeek, startTime, endTime } = req.body;

    if (!doctorId || !dayOfWeek || !startTime || !endTime) {
        return res.status(400).json({ message: 'Provide all fields' });
    }

    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
        return res.status(400).json({ message: 'Invalid Doctor Id' });
    };

    const doctor = await Staff.findById(doctorId);
    if (!doctor || doctor.status === 'inactive') {
        return res.status(404).json({ message: 'Doctor not found' });
    };

    const newSchedule = await Schedule.create(
        {
            doctorId,
            specialty: doctor.specialty,
            dayOfWeek,
            startTime,
            endTime
        }
    );

    if (!newSchedule) {
        return res.status(400).json({ message: 'Cannot save schedule' });
    }

    res.status(201).json(newSchedule);
});

module.exports = {
    createSchedule
}