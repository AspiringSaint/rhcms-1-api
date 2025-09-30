const router = require('express').Router();
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const {
    createPatient,
    getPatients
} = require('../controllers/patient.controller');

router.post('/', createPatient);
router.get('/', getPatients);

module.exports = router;