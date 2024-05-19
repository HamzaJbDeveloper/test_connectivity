const Schema=require("mongoose").Schema;
const model=require("mongoose").model;


const equipmentSchema=new Schema({
    type:String,
    department:String,
    adressMac:String,
    password:String,
    adressIp:{
        type:String,
        require:false
    },
    status:{
        type:String,
        require:false,
        default:false
    }
})

const EquipmentModel=model("equipment",equipmentSchema);

module.exports=EquipmentModel;
