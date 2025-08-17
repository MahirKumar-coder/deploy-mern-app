const { signup, login } = require('../controllers/AuthController');
const { singupValidation, loginValidation } = require('../middlewares/AuthValidation');

const router = require('express').Router()



router.post('/login', loginValidation, login);
router.post('/signup', singupValidation, signup);

module.exports = router;