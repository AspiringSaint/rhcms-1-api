const router = require('express').Router();
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const {
    createStaff,
    getAllStaff,
    getStaffById
} = require('../controllers/staff.controller');

router.post('/registration', authenticate, authorize('admin'), createStaff);
router.get('/', authenticate, authorize('admin'), getAllStaff);
router.get('/:id', authenticate, authorize('admin'), getStaffById);

module.exports = router;