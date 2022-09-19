const router = require('express').Router();
const { signup, login } = require('../controllers/user.controller');

router.post('/register',signup);
router.post('/login',login);

module.exports = router;