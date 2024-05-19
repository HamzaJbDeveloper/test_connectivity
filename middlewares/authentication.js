const jwt=require("../utils/jwt")


module.exports=function(req, res, next){
    
    const token = req.cookies.token
    if(!token){
        throw ""
    }
    const isValid=jwt.verifyJWT(token)

    if(isValid){
        next()
    }else{
        res.json({msg:"Your are not authenticated"})
    }

}