const router = require('express').Router();
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const {
    createPatient
} = require('../controllers/patient.controller');

router.post('/', createPatient);

module.exports = router;