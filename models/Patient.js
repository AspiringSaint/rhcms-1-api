const mongoose = require('mongoose');

const medicalHistorySchema = new mongoose.Schema(
    {
        date: { type: Date, required: true },
        reason: { type: String, required: true },
        doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
        diagnosis: { type: String },
        treatment: { type: String },
        notes: { type: String }
    },
    {
        timestamps: true
    }
);


const patientSchema = new mongoose.Schema(
    {
        patientId: { type: String, unique: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        suffix: { type: String },
        dob: { type: Date, required: true },
        gender: { type: String, enum: ['male', 'female', 'other'], required: true },
        address: { type: String, required: true },
        contactNumber: { type: String, unique: true },
        primaryDoctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
        medicalHistory: [medicalHistorySchema],
    },
    {
        timestamps: true
    }
);


// Pre-save hook to generate patientId if missing
patientSchema.pre('save', async function (next) {
  if (!this.patientId) {
    const count = await mongoose.model('Patient').countDocuments();
    this.patientId = `RHC-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});


module.exports = mongoose.model('Patient', patientSchema);