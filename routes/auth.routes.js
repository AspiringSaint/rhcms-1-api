const router = require('express').Router();
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const { 
    register,
    login,
    logout
} = require('../controllers/auth.controller');

router.post('/register', authenticate, authorize('admin'), register);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;