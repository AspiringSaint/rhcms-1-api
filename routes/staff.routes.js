const router = require('express').Router();
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const {
    createStaff
} = require('../controllers/staff.controller');

router.post('/registration', authenticate, authorize('admin'), createStaff);

module.exports = router;