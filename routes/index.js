const express = require('express');
const router = express.Router();

const homeController = require('../controller/home_controller')

router.get('/', homeController.homeDashboard);

router.use('/users', require('./user'));

module.exports = router;