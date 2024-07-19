const express = require ('express');
const {getuserinfo ,updateuserController} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

//routes
router.get('/getuser',authMiddleware,getuserinfo);

router.put('/updateUser',authMiddleware,updateuserController)


module.exports =router;