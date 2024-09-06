const express = require('express');
const router = new express.Router();
const partnerController = require('../controllers/partnerController');
// const checkAuth = require('../authentication/checkAuth');

router.get('/', partnerController.getAllPartners);

module.exports = router;
