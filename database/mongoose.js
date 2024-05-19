const mongoose = require('mongoose');


// connexion url OF mongodb
// const URL="mongodb://localhost:27017/bizert";
const URL="mongodb+srv://hamzadeveloperjb:MXi0KyReFehhlmXY@cluster0.22qlext.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/bizert";


const mongooseConnect=async function (){
    try{
        const connexion=await mongoose.connect(URL)
        console.log("server connected to db succefully !")
    }catch(err){
        console.log("error while connecting to database")
    }
}


module.exports=mongooseConnect;