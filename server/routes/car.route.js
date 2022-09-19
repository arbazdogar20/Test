const router = require('express').Router();
const { registerCar } = require('../controllers/car.controller');

router.post('/register',registerCar);

module.exports = router;