const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema(
    {
        doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Staff", required: true },
        specialty: { type: String, required: true },
        dayOfWeek: {
            type: String,
            enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
            required: true
        },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true }
    },
    {
        timestamps: true 
    }
);

module.exports = mongoose.model('Schedule', scheduleSchema);