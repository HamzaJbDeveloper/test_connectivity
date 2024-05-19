// user model
const UsersModel=require("../models/Users")
// bcryp 
const bcrypt=require("../utils/bcrypt")
const jwt=require("../utils/jwt")


const loginController=async function (req, res, next){

    try{
        const {email, password}=req.body;

        const userWithEmail=await UsersModel.findOne({email:email})
        if(!userWithEmail)return res.status(200).json({msg:"no user match with that email"})

        const passwordIsValid=await bcrypt.comparePassword(password, userWithEmail.password)
        if(!passwordIsValid)return res.json({msg:"wrong password"})
        
            const token=jwt.signJWT({...userWithEmail,password:null})
            res.json({token:token})

    }catch(err){
        res.status(200).json({msg:"error while login"})
        console.log(err)
    }
    
}

const registerController=async function (req, res, next){

    try{
        const {firstName, lastName, email, password,isAdmin}=req.body;
        const userInfo={firstName, lastName, email, password,isAdmin};
        

        const alreadyMakeWithEmail=await UsersModel.find({email:email});
        if(alreadyMakeWithEmail.length>0)return res.json({status:false,msg:"This email is already used !"})
       
        const hashedPassword=await bcrypt.hashPassword(password)

        const addUserRequest=new UsersModel({...userInfo,password:hashedPassword})
        await addUserRequest.save()
        res.status(200).json({status:true,msg:"new user is created !"})
    
    }catch(err){
        res.status(200).json({status:false,msg:"error while creating user"})
        console.log(err)
    }
    
    
}


module.exports={
    loginController:loginController,
    registerController:registerController
}