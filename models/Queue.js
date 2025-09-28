const mongoose = require('mongoose');

const queueEntrySchema = new mongoose.Schema(
    {
        patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
        status: { type: String, enum: ['Waiting', 'In Consultation', 'Completed', 'Other'], default: 'Waiting' },
        checkInTime: { type: Date, default: Date.now },
        startConsultation: { type: Date },
        endConsultation: { type: Date },
        priority: { type: Boolean, default: false },
        queueNumber: { type: Number, required: true }
    }
);

const queueSchema = new mongoose.Schema(
    {
        specialty: { type: String, required: true },
        doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
        date: { type: Date, default: new Date().setHours(0, 0, 0, 0)},
        patients: [queueEntrySchema],
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Queue', queueSchema);