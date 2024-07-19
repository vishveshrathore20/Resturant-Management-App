const express = require ('express');
const testusercontroller = require('../controllers/testController')

//object
const router =express.Router();

//Route
router.get('/test-user',testusercontroller);

//export
module.exports= router;