const jwt = require('jsonwebtoken');

module.exports = async(req,res,next)=>{
    try {
        //            'BEARER sdflkdhsfkj12'.split(' ') -> ['BEARER', 'token'] -> [1]
        const token = req.headers["authorization"].split(" ")[1] // req header: authorization: BEARER sdflkdhsfkj12 
        jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
            if(err)
            {
                return res.status(401).send({
                    success:false,
                    message:'Unauthorized Useer'
                })
            }
            else{
                req.body.id = decode.id;
                next();  
            }
        });



    } catch (error) {
        console.log('error');
        res.status(500).send({
            success:false,
            message:'Error in auth api',
            error
        })
    }
}