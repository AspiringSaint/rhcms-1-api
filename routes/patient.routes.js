const router = require('express').Router();
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const {
    createPatient,
    getPatients,
    getPatientById
} = require('../controllers/patient.controller');

router.post('/', createPatient);
router.get('/', getPatients);
router.get('/:id', getPatientById)

module.exports = router;