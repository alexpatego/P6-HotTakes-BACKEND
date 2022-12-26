const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
// const checkMail = require('../middleware/emailValidator');
// const password = require('../middleware/passwordValidator')

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;