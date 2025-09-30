const router = require('express').Router();
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const {
    createSchedule
} = require('../controllers/schedule.controller');

router.post('/', authenticate, authorize('admin'), createSchedule);

module.exports = router;