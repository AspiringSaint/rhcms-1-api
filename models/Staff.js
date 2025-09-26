const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        role: {
            type: String,
            enum: ['admin', 'doctor', 'nurse', 'bhw', 'pharmacist'],
            default: 'bhw'
        },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Staff', staffSchema);