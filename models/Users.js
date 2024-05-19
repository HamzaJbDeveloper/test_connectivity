const Schema=require("mongoose").Schema;
const model=require("mongoose").model;


const usersSchema=new Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    isAdmin:{
        type:Boolean,
        default:false
    }
})

const UsersModel=model("users",usersSchema);

module.exports=UsersModel;