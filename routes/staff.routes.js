const router = require('express').Router();
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const {
    createStaff,
    getAllStaff
} = require('../controllers/staff.controller');

router.post('/registration', authenticate, authorize('admin'), createStaff);
router.get('/', authenticate, authorize('admin'), getAllStaff);

module.exports = router;