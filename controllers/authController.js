const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerController  = async(req, res) =>{
    try {
        
    const {username,email,password,phone,address,usertype} = req.body;
    
    //validation
    if( !email || !password || !username || !phone || !address){
            return res.status(500).send({
                success:false,
                message:'Please provide all the fields ',
                error:error.message  
            })
    }

    // check wheather user is already registered....

    const existing = await userModel.findOne({email});

    if(existing){
        return res.status(500).send({
            success:false,
            message:'User Already existing with same E-mail ',
            error:error.message
        })
    }

    //hashing the password using bcrypt
    const salt =bcrypt.genSaltSync(10);
    const hashedpassword = await bcrypt.hash(password,salt);

    //create new user
    const user =  await userModel.create({username,email,password:hashedpassword,address,phone,usertype});
    res.status(200).send({
        success:true,
        message:'User Registered Successfully'
    })
    
}
    catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Failed to register',
            error:error.message
        })
    }
};


const loginController = async(req,res) =>{
    
    try {
        const {email,password} = req.body;

        if(!email || !password)
        {
             return res.status(500).send({
                Success:false,
                message:'Please Provide Email and Password',
                error
            })
        }

        const user = await userModel.findOne({email:email});

        if(!user){
              return res.status(404).send({
                Success:false,
                message:'User Not Found',
            });
        }

        //check user password
        const ismatch = await bcrypt.compare(password,user.password);
        if(!ismatch){
            return res.status(500).send({
                success:false,
                message:'Invalid Creendiatials',
            });
        }

        //jwt token
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:'7d',
        });

        res.status(200).send({
            success:true,
            message:'Login Successful',
            user,
            token,
        })

    } catch (error) {
        console.log(error);
            res.status(500).send({
            Success:false,
            message:'Error in Login API',
            error
        })
    }

}

module.exports = {registerController , loginController};