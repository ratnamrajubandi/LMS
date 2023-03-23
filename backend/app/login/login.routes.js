const express = require('express');
const router = express.Router();
const loginController = require('./login.controller');

router.post('/', loginController.create);

module.exports = router;

