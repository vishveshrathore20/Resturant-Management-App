const userModel = require("../models/userModel");

const getuserinfo = async (req,res) =>{
     
     try {
          const user = await userModel.findById({_id:req.body.id});
          if(!user){
               return res.status(404).send({
                    success:false,
                    message:'User not found',
               })
          }

          user.password = undefined;
          res.status(200).send({
               success:true,
               message:'user found',
               user
          })

     } catch (error) {
          res.send(500).send({
               success:false,
               message:'Internal server error'
          })
     }
     // console.log(req.body.id);
}


const updateuserController = async (req,res)=>{
     try {

          const user = await userModel.findById({_id:req.body.id});
          
          //update
          const {username ,address,phone} = req.body;
          if(username) user.username =username;
          if(address) user.address = address;
          if(phone) user.phone =phone;

          await user.save();

          res.status(200).send({
               success:true,
               message:'User Updated succesfully'
          })
 
          
     } catch (error) {
          res.status(500).send({
               success:false,
               message:'Error in update api',
               error
          })
     }
}

module.exports = {getuserinfo , updateuserController };

