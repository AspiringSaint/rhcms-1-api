const router = require('express').Router();
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const { 
    login,
    logout
} = require('../controllers/auth.controller');

router.post('/login', login);
router.post('/logout', logout);

module.exports = router;