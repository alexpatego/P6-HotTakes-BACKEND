const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

// s'enregistre
router.post('/signup', userCtrl.signup);
// se connecte
router.post('/login', userCtrl.login);

module.exports = router;