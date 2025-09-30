const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        role: {
            type: String,
            enum: ['admin', 'doctor', 'nurse', 'bhw', 'pharmacist'],
            default: 'bhw'
        },
        specialty: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Staff', staffSchema);