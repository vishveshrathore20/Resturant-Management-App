const testusercontroller =(req,res)=>{
    try {
        res.status(200).send({
           Success:true,
           message: 'Api Success test',
        });
    } catch (err) {
       console.log("error in test API " ,err) 
    }
}

module.exports= testusercontroller; 