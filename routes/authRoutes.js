const express = require ('express');
const {registerController,loginController} = require('../controllers/authController');


const router = express.Router();

//Register Routes
router.post('/register',registerController);

//Login Routes
router.post('/login',loginController)

module.exports =router;