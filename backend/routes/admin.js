const express = require('express');
const adminController = require('../controller/admin');


const router = express.Router();


router.post('/admin', adminController);


module.exports = router;