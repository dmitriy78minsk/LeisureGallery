var express = require('express');
var router = express.Router();
var ctrlAuth = require('../api/controllers/authentication');

/* GET home page. */
router.post('/register', ctrlAuth.register);
router.post('/authentication', ctrlAuth.authentication);

module.exports = router;