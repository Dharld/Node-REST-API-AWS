const express = require('express');
const router = new express.Router();
const submitAnswerController = require('../controllers/submitAnswerController');
// const checkAuth = require('../authentication/checkAuth');

router.post('/', submitAnswerController.submitAnswer);

module.exports = router;
